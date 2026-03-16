import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const ProductCard = ({ carne }) =>  {

  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!user){
      navigate('/login')
    } else{
      addToCart(carne, 1)
      setAdded(true)
      setTimeout(()=> setAdded(false), 1000)
    }
  }

  return (
    <div className="group relative w-full h-105 overflow-hidden bg-black border border-white/5">

      <div className="relative w-full h-full overflow-hidden bg-neutral-900">

        <img
          src={carne.imagen}
          alt={carne.nombre}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <button
          onClick={handleAdd}
          className="absolute top-6 right-6 z-20 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300
            px-5 py-2 rounded-xl bg-red-600/90 text-white text-sm font-semibold
            shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:bg-red-700"
        >
          Comprar
        </button>

        {/* 🔔 NOTIFICACIÓN */}
        {added && (
          <div className="
            absolute top-6 left-1/2 -translate-x-1/2 z-30
            px-5 py-2 rounded-xl
            bg-black/80 backdrop-blur-xl
            border border-red-500/30
            text-red-400 text-sm font-semibold
            shadow-[0_0_25px_rgba(220,38,38,0.4)]
            animate-fadeIn
          ">
            ✅ Agregado al carrito
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <span className="inline-block mb-3 text-xs uppercase tracking-[0.25em] text-red-500 font-semibold">
            {carne.corte}
          </span>

          <h3 className="text-white text-2xl font-semibold tracking-wide leading-tight">
            {carne.nombre}
          </h3>

          <div className="w-12 h-px bg-red-600/60 my-3"></div>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-[85%]">
            {carne.descripcion}
          </p>
        </div>

      </div>
    </div>
  )
};

export default ProductCard;
