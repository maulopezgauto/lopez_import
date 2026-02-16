import React from "react";
import Team from "../components/catalogues/temcards.jsx"

const PilarCard = ({ nombre, posicion, imagen, descripcion, id }) => {
  return (
    <div className="group text-center">
      <div className="relative h-80 mb-8 overflow-hidden">
        <img
          src={imagen}
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <h3 className="text-2xl font-serif mb-4">{nombre}</h3>
      <p className="text-neutral-400 leading-relaxed">
        {descripcion}
      </p>
    </div>
  );
}

export default PilarCard;