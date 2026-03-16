import { useNavigate } from "react-router-dom"

export default function BackButton({ className = "" }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        fixed bottom-8 left-8 z-50
        flex items-center gap-3
        px-5 py-3 rounded-full
        bg-black/70 backdrop-blur-xl
        border border-white/10
        text-white
        shadow-[0_0_30px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:scale-105 hover:border-red-500/40
        hover:shadow-[0_0_40px_rgba(220,38,38,0.25)]
        ${className}
      `}
    >
      <span className="text-xl">←</span>
      <span className="text-sm font-semibold tracking-wide">Volver</span>
    </button>
  )
}