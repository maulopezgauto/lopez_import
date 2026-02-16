import { ChevronDownIcon } from '@heroicons/react/16/solid'
import paraguayFlag from './assets/img/backgrounds/paraguay-flag-png.png'
import ContactForm  from './components/contactForm.jsx';

function ContactPage() {
  return (
  <div className="bg-black relative min-h-screen overflow-hidden">
          {/* Mapa Sudamérica */}
            <div 
              className="absolute mx-80 top-0 h-full w-[65%] z-0 opacity-20 bg-no-repeat bg-right pointer-events-none"
              style={{ 
                backgroundImage: `url(${paraguayFlag})`,
                backgroundSize: 'contain',
              }}
            />
          <ContactForm />
  </div>
  )
}

export default ContactPage;