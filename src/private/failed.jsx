import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Failed() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)]">
        
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4 tracking-wide">
          ¡Pago Rechazado!
        </h1>

        {/* Message */}
        <p className="text-neutral-300 mb-6 leading-relaxed">
          Lo sentimos, tu pago no pudo ser procesado. Por favor, verifica los datos de tu tarjeta e intenta nuevamente.
          <br /><br />
          Si el problema persiste, contacta con nuestro equipo de soporte.
        </p>

        {/* Error Reasons */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-red-400 mb-3">
            Posibles razones:
          </p>
          <ul className="text-xs text-neutral-400 space-y-2">
            <li>• Datos de la tarjeta incorrectos</li>
            <li>• Fondos insuficientes</li>
            <li>• Tarjeta expirada o bloqueada</li>
            <li>• Límite de transacciones excedido</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-sm text-neutral-400">
            ¿Necesitas ayuda?
          </p>
          <p className="text-sm font-semibold text-red-400 mt-1">
            +1 (829) 123-4567
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/private/shopCart")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Revisar Carrito
          </button>
          
          <button
            onClick={() => navigate("/private/checkout")}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Reintentar Pago
          </button>

          <button
            onClick={() => navigate("/private/privateCatalogue")}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Volver al Catálogo
          </button>
        </div>

      </div>
    </div>
  )
}
