import React from "react";
import Team from "./catalogue/temcards.jsx"

const PilarCard = ({ nombre, posicion: _posicion, imagen, descripcion, id: _id }) => {
  // eslint-disable-next-line no-unused-vars
  const unused = { _posicion, _id };
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