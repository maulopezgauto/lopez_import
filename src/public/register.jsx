import { useState } from 'react'
import { supabase } from '../config/services/supabase'
import { useNavigate } from 'react-router-dom'
import blackBG from '../assets/img/backgrounds/blackbg.png'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre_usuario, setNombreUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    // 1) Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      return
    }

    // 2) Guardar perfil en tabla users
    const userId = data.user.id

    const { error: profileError } = await supabase
      .from('usuarios')
      .insert({
        id: userId,
        nombre,
        telefono,
        direccion,
        nombre_usuario,
        correo: email,
        contraseña: password,  
      })

    if (profileError) {
      setErrorMsg('Error creando perfil de usuario')
      return
    }

    navigate('/private/lobby')
  }

  return (
    <div className="relative flex justify-center items-center py-32 px-6"
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
            Registro
          </h2>
          <div className="mt-4 h-px w-24 mx-auto bg-linear-to-r from-transparent via-red-600 to-transparent" />
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-8">

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Nombre completo
            </label>
            <input
              type="text"
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
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Nombre de usuario
            </label>
            <input
              type="text"
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
              value={nombre_usuario}
              onChange={e => setNombreUsuario(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Teléfono
            </label>
            <input
              type="text"
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
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Dirección
            </label>
            <input
              type="text"
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
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-neutral-400">
              Correo electrónico
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
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-neutral-400">¿Ya tienes cuenta?</span>
          <button
            onClick={() => navigate('/')}
            className="text-red-600 font-light ml-2 hover:text-red-500 transition tracking-wide uppercase text-xs"
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  )
}
