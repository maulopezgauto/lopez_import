import { useEffect, useState } from 'react'
import { supabase } from '../config/services/supabase'
import { useAuth } from '../context/AuthContext'

import SidebarItem from '../components/profile/SideBarItem.jsx'
import InputField from '../components/profile/InputField'
import ProfileAvatar from '../components/profile/ProfileAvatar'

export default function Profile() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    avatar_url: ''
  })

  /* 🔽 Cargar perfil */
  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const { data } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) setForm(data)
    }

    loadProfile()
  }, [user])

  /* ✏️ Actualizar inputs */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* 💾 Guardar en DB */
  const saveProfile = async () => {
    await supabase
      .from('usuarios')
      .update(form)
      .eq('id', user.id)
  }

  /* 📤 Subir avatar */
  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}.${fileExt}`

  // subir imagen
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return
  }

  // obtener url pública
  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  const avatarUrl = urlData.publicUrl

  // guardar en DB
  await supabase
    .from('usuarios')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.id)

  // actualizar estado local
  setForm({ ...form, avatar_url: avatarUrl })
}

  return (
    <div className="min-h-screen py-24 w-full bg-neutral-950 text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-neutral-900/80 border-r border-white/10 p-6">
        <h2 className="text-xl font-bold mb-10">Mi Perfil</h2>
        <SidebarItem active label="Editar Perfil" />
        <SidebarItem label="Seguridad" />
        <SidebarItem label="Configuración" />
      </div>

      {/* Content */}
      <div className="flex-1 p-12">

        <ProfileAvatar 
          avatarUrl={form.avatar_url} 
          onUpload={handleAvatarUpload}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
          <InputField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />
          <InputField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
          <InputField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
          <InputField label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} />
          <InputField label="País" name="pais" value={form.pais} onChange={handleChange} />
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={saveProfile}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Guardar cambios
          </button>
        </div>

      </div>
    </div>
  )
}