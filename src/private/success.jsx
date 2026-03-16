import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Success() {
  const { user } = useAuth()
  const { clearCart } = useCart()
  const navigate = useNavigate()
  const cartClearedRef = useRef(false)

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    // Limpiar carrito solo UNA VEZ cuando lleguemos a success
    if (!cartClearedRef.current) {
      clearCart()
      cartClearedRef.current = true
    }
  }, [user, navigate, clearCart])

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)]">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 tracking-wide">
          ¡Pago Aprobado!
        </h1>

        {/* Message */}
        <p className="text-neutral-300 mb-6 leading-relaxed">
          Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          <br /><br />
          En los próximos minutos recibirás un mensaje por WhatsApp o correo electrónico
          con la confirmación final y detalles de envío.
        </p>

        {/* Contact Info */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-sm text-neutral-400">
            ¿Tienes preguntas? Contáctanos:
          </p>
          <p className="text-sm font-semibold text-red-400 mt-1">
            +1 (829) 123-4567
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/private/orders")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Ver Mis Pedidos
          </button>
          
          <button
            onClick={() => navigate("/private/privateCatalogue")}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Continuar Comprando
          </button>
        </div>

      </div>
    </div>
  )
}