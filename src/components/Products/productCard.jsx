import React from 'react';


const ProductCard = ({ carne }) =>  {
  return (
    <div className="group
          relative
          w-full
          h-105
          overflow-hidden
          bg-black
          border border-white/5
          shadow-[0_0_40px_rgba(255,255,255,0.02)]
          transition-all
          duration-500
          hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]
          mx-auto
        ">
      <div className="overflow-hidden bg-neutral-900">
        <img
          src={carne.imagen}
          alt={carne.nombre}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />
        {/* Overlay */}
        <div className="
          absolute inset-0
          bg-linear-to-t
          from-black via-black/40 to-black/10
        " />

      <div className="absolute bottom-0 left-0 right-0 p-8">

        {/* Tipo */}
        <span className="
          inline-block
          mb-3
          text-xs
          uppercase
          tracking-[0.25em]
          text-red-500
          font-semibold
        ">
          {carne.corte}
        </span>

        {/* Nombre */}
        <h3 className="
          text-white
          text-2xl
          font-semibold
          tracking-wide
          leading-tight
        ">
          {carne.nombre}
        </h3>

        <div className="w-12 h-px bg-red-600/60 my-3"></div>

        {/* Descripción */}
        <p className="
          text-sm
          text-neutral-300
          leading-relaxed
          max-w-[85%]
        ">
          {carne.descripcion}
        </p>

      </div>
    </div>
  </div>
  )
};

export default ProductCard;
