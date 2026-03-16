import { useEffect, useState } from "react"
import CheckoutForm from "@/components/CheckoutForm"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton.jsx"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/config/stripe/stripeClient"

export default function Checkout() {

  const { cart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const idempotency_key = crypto.randomUUID() // Generar un idempotency key único para esta transacción 

  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    if (!authLoading && !user) navigate("/login")
    if (!authLoading && cart.length === 0) navigate("/catalogue")
  }, [user, authLoading, cart])

  // 🔑 Crear PaymentIntent
  useEffect(() => {

    const createIntent = async () => {

      const res = await fetch("http://localhost:4000/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario_id: user.id,
          carrito: cart,
          idempotency_key,
          amount: cart.reduce((t, i) => t + i.precio * i.cantidad, 0),
          order_id: "ORDER_" + Date.now()
        })
      })

      const data = await res.json()

      setClientSecret(data.clientSecret)

    }

    if(cart.length > 0){
      createIntent()
    }

  }, [cart])

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white px-10 py-16">

      <h1 className="text-4xl font-bold tracking-wide mb-10 py-20">
        <BackButton />
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Productos */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id}>
              {item.nombre}
            </div>
          ))}
        </div>

        {/* Pago */}
        <div className="h-fit bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

          {!clientSecret ? (
            <p>Cargando pago...</p>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}

        </div>

      </div>
    </div>
  )
}