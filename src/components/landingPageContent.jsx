import { Link } from 'react-router-dom'
import Team from './catalogues/temcards.jsx'
import carnesLanding from './catalogues/catalogoCarnesLanding.jsx'
import steak from '../assets/img/carnes/steak_black_bg.jpg'
import blackbg from '../assets/img/backgrounds/blackbg.png'
import PilarCard from '../components/teamCard.jsx';

function Content() {
        return (
        <div className="w-full">
            <section 
            style={{ backgroundImage: `linear-gradient(to top, transparent, black), linear-gradient(to bottom, transparent, black) ,url(${blackbg})`}}
            className="bg-cover py-60 z-10">
            <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl text-white font-serif text-center">
                Our Premium Meat Cuts
            </h2>
            <p className="text-gray-400 text-center mt-4 max-w-xl mx-auto">
                Imported beef, pork and poultry with strict quality control.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
                {carnesLanding.slice(0,3).map(carne => (
                <div
    key={carne.id}
    className="
        group
        bg-neutral-900
        border border-white/5
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]
    "
    >
    {/* Imagen */}
    <div className="relative h-64 overflow-hidden">
        <img
        src={carne.imagen}
        className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
        "
        />
        <div className="absolute inset-0 bg-black/30" />
    </div>

    {/* Texto */}
    <div className="p-6">
        <h3 className="text-white text-lg font-semibold tracking-wide">
        {carne.nombre}
        </h3>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
        {carne.descripcion}
        </p>
    </div>
    </div>

                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link to="/catalogue"
                className="px-10 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition">
                Full Catalogue
                </Link>
            </div>
            </div>
        
        </section>
            <section style={{ backgroundImage: `linear-gradient(to top, transparent, black), linear-gradient(to bottom, transparent, black) ,url(${steak})`}} 
                    className="bg-cover bg-black py-32 text-white">
                <div className="max-w-6xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">
                    Nuestra Experiencia
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Importamos y distribuimos carnes de alta calidad para quienes exigen lo mejor.
                </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                {Team.map((Team, index) => (
                    <PilarCard key={index} {...Team} />
                ))}
                </div>
            </section>

            <section 
                style={{backgroundImage: `linear-gradient(to top, transparent, black), linear-gradient(to bottom, transparent, black) ,url(${blackbg})`}}
                className="bg-cover py-20">
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-150 h-75 bg-red-600/10 blur-3xl rounded-full" />
                </div>
                    <div className="max-w-4xl mx-auto px-6">
                        <div 
                        className="
                            bg-white/5
                            backdrop-blur-xl
                            border border-white/10
                            rounded-3xl
                            px-16 py-14
                            text-center
                            shadow-2xl
                        ">
                        <h2 className="text-4xl font-serif text-white tracking-wide">
                            Get in Touch
                        </h2>

                        <p className="mt-4 text-gray-300">
                            Premium meat imports from Paraguay. Let’s talk business.
                        </p>

                        <button
                        to="/contactPage"
                        className="
                            mt-10
                            px-10 py-4
                            rounded-full
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            font-medium
                            tracking-wide
                            shadow-lg shadow-red-600/30
                            transition
                            ">
                            Contact Us
                        </button>
                        
                    </div>
                    </div>
            </section>
        </div>
    )
}

export default Content;
