import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../config/services/supabase.js'
import { useAuth } from '../context/AuthContext'

export default function AppLobby() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    orders: 0,
    purchases: 0,
    pending: 0,
    totalSpend: 0
  })

  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchStats = async () => {
      // Obtener pedidos del usuario
      const { data: pedidos, error } = await supabase
        .from("pedidos")
        .select("*")
        .eq("usuario_id", user.id)

      if (error) {
        console.error("Error fetching stats:", error)
        return
      }

      const orders = pedidos.length
      const pending = pedidos.filter(p => p.estado_nombre === 'pendiente_pago' || p.estado_nombre === 'procesando').length
      const totalSpend = pedidos
        .filter(p => p.payment_status_nombre === 'paid')
        .reduce((sum, p) => sum + p.total, 0)

      // Para purchases, podríamos contar productos, pero por ahora usar orders * avg items o algo. Usemos orders por simplicidad.
      const purchases = orders

      setStats({
        orders,
        purchases,
        pending,
        totalSpend
      })
    }

    const fetchUserProfile = async () => {
      const { data: profile } = await supabase
        .from("usuarios")
        .select("total_gastado")
        .eq("id", user.id)
        .single()

      if (profile) {
        setUserProfile(profile)
      }
    }

    fetchStats()
    fetchUserProfile()
  }, [user])

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white px-16 py-28 overflow-hidden">

      {/* Glow decorativo */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-175 h-175 bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-16">
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase">
          Control Panel
        </h1>
        <p className="text-neutral-400 mt-4 tracking-wide">
          Premium meat distribution platform
        </p>
        <div className="mt-6 h-px w-32 bg-linear-to-r from-red-600 to-transparent" />
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Purchases" value={stats.purchases} />
        <StatCard title="Pending" value={stats.pending} />
      </div>

      {/* Total Gastado Destacado */}
      {userProfile && (
        <div className="relative z-10 mb-16">
          <div className="
            bg-linear-to-r from-red-600/20 via-red-500/15 to-red-600/20
            border border-red-500/30
            rounded-2xl p-8
            text-center
            shadow-[0_0_40px_rgba(220,38,38,0.2)]
          ">
            <h3 className="text-xl font-bold text-white mb-2">
              💰 Total Gastado en la Plataforma
            </h3>
            <p className="text-4xl font-light text-red-400">
              RD$ {(userProfile.total_gastado || 0).toLocaleString()}
            </p>
            <p className="text-sm text-neutral-400 mt-2">
              Suma de todos tus pedidos pagados
            </p>
          </div>
        </div>
      )}

      {/* Navigation Cards */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <LuxuryCard title="Catalog" desc="Explore premium meats" go="/private/privateCatalogue" icon="🥩" />
        <LuxuryCard title="Cart" desc="View selected products" go="/private/shopCart" icon="🛒" />
        <LuxuryCard title="Orders" desc="Purchase history" go="/private/orders" icon="📦" />
        <LuxuryCard title="Profile" desc="Manage account" go="/private/profile" icon="👤" />
      </div>
    </div>
  )
}

/* ---------- Components ---------- */

const LuxuryCard = ({ title, desc, go, icon }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(go)}
      className="
        cursor-pointer
        group
        bg-black/50 backdrop-blur-lg
        border border-white/10
        px-8 py-10
        transition-all duration-300
        hover:border-red-600/40
        hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]
      "
    >
      <div className="text-3xl mb-6">{icon}</div>
      <h3 className="text-lg tracking-widest uppercase font-light text-white">
        {title}
      </h3>
      <p className="text-sm text-neutral-400 mt-3">
        {desc}
      </p>
      <div className="mt-6 h-px w-10 bg-red-600/60 group-hover:w-20 transition-all duration-300" />
    </div>
  )
}

const StatCard = ({ title, value }) => {
  return (
    <div className="
      bg-black/40 backdrop-blur-md
      border border-white/10
      px-6 py-6
      text-center
    ">
      <p className="text-xs uppercase tracking-widest text-neutral-400">
        {title}
      </p>
      <p className="text-2xl font-light mt-3 text-white">
        {value}
      </p>
    </div>
  )
}
