import { useState } from 'react'
import { supabase } from '../config/services/supabase'
import { useNavigate } from 'react-router-dom'
import blackBG from '../assets/img/backgrounds/blackbg.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setErrorMsg('Correo o contraseña incorrectos')
    } else {
      navigate('/private/lobby')
    }
  }

  return (
    <div 
    className="relative flex justify-center items-center py-50 px-6"
    style={{background: `url(${blackBG})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Glow decorativo */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-150 h-150 bg-red-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Card luxury */}
      <div className="
        relative z-10
        w-full max-w-md
        bg-black/60 backdrop-blur-xl
        border border-white/10
        shadow-[0_0_60px_rgba(0,0,0,0.8)]
        px-14 py-16
      ">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-light tracking-[0.2em] text-white uppercase">
            Login
          </h2>
          <div className="mt-4 h-px w-24 mx-auto bg-linear-to-r from-transparent via-red-600 to-transparent" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8">

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Correo
            </label>
            <input
              type="email"
              className="
                mt-2 w-full
                bg-transparent
                border-b border-white/15
                py-3
                text-white
                outline-none
                focus:border-red-600
                transition
              "
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Contraseña
            </label>
            <input
              type="password"
              className="
                mt-2 w-full
                bg-transparent
                border-b border-white/15
                py-3
                text-white
                outline-none
                focus:border-red-600
                transition
              "
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="
                px-14 py-3
                uppercase tracking-widest text-sm
                text-white
                border border-red-600/40
                bg-black
                hover:bg-red-600/10
                hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]
                transition-all duration-300
              "
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-neutral-400">¿No tienes cuenta?</span>
          <button
            onClick={() => navigate('/register')}
            className="text-red-600 font-light ml-2 hover:text-red-500 transition tracking-wide uppercase text-xs"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  )
}
