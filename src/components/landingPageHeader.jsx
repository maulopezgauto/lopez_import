import React from "react";
import carne from "../assets/img/carnes/carneslobby.jpg"

function LandingPageHeader() {

  return (
    <div style={{ backgroundImage: `url(${carne})` }} className="relative min-h-screen bg-cover bg-center ">
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-extrabold text-white mb-6">
            Example page
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Start designing your landing page here and build something amazing.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              className="
                border border-white/40
                text-white
                px-8 py-4
                rounded-full
                hover:bg-white hover:text-black
                transition
              "
            >
              Watch video
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-linear-to-b from-transparent to-black py-24"/>
    </div>
  );
}

export default LandingPageHeader;
