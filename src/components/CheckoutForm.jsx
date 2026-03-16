import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setErrorMsg(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/private/success"
      },
      redirect: "if_required"
    })

    if (error) {
      console.error("❌ Error en pago:", error.message)
      setErrorMsg(error.message)
      setLoading(false)
      
      // Redirigir a página de fallo después de 2 segundos
      setTimeout(() => {
        navigate("/private/failed")
      }, 2000)
      return
    }

    // Aquí NO hacemos clearCart() - lo hace success.jsx después
    // El pago se está procesando
    if (paymentIntent) {
      
      if (paymentIntent.status === "succeeded" || paymentIntent.status === "processing") {
        // Stripe manejará el redirect a return_url
        navigate("/private/success")
      } else {
        setErrorMsg("Error al procesar el pago")
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Card container */}
      <div className="
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-6
        shadow-[0_0_60px_rgba(0,0,0,0.6)]
      ">
        <PaymentElement />
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="
          text-red-400 text-sm
          bg-red-500/10
          border border-red-500/30
          p-4 rounded-xl
          shadow-[0_0_20px_rgba(220,38,38,0.3)]
        ">
          {errorMsg}
        </div>
      )}

      {/* Luxury Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`
          relative w-full py-3 rounded-xl font-semibold tracking-widest
          transition-all duration-300 overflow-hidden
          ${loading
            ? "bg-neutral-800 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 shadow-[0_0_40px_rgba(220,38,38,0.6)]"}
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-xs tracking-[0.3em] uppercase">
              Procesando pago
            </span>
          </div>
        ) : (
          "Pagar ahora"
        )}

        {!loading && (
          <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition">
            <div className="absolute inset-0 bg-linear-to-r from-red-500/20 via-red-600/30 to-red-500/20 blur-xl"></div>
          </div>
        )}
      </button>

      {/* Footer text */}
      <div className="text-center text-xs text-neutral-500 tracking-wide">
        Pago seguro cifrado · Stripe Certified · PCI DSS Compliant
      </div>

    </form>
    
  )
}