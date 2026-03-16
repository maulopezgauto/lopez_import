import React, { useState, useEffect } from "react"
import { supabase } from "../config/services/supabase.js"
import { useAuth } from "../context/AuthContext"
import StatusBadge from "../components/StatusBadge.jsx"

export default function PrivateOrders() {
  const { user } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPedidos = async () => {
      const { data, error } = await supabase
        .from("pedidos_completos")
        .select("*")
        .eq("usuario_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching pedidos:", error)
      } else {
        setPedidos(data || [])
      }
      setLoading(false)
    }

    fetchPedidos()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 text-white px-12 py-28 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white px-12 py-28">

      {/* Header */}
      <div className="mb-10 animate-fadeDown">
        <h1 className="text-3xl font-bold tracking-wide">📦 Mis Pedidos</h1>
        <p className="text-neutral-400 mt-2">
          Historial de compras y estado de pedidos
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 max-w-5xl animate-fadeUp">

        {pedidos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">No tienes pedidos aún.</p>
          </div>
        ) : (
          pedidos.map((pedido) => {
            return (
              <div
                key={pedido.id}
                className="
                  group relative overflow-hidden
                  rounded-2xl border border-white/10
                  bg-white/5 backdrop-blur-xl
                  shadow-[0_0_40px_rgba(255,255,255,0.03)]
                  hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]
                  transition-all duration-500
                  p-6
                "
              >
                {/* Glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="flex justify-between items-center">

                  {/* Info */}
                  <div>
                    <p className="text-sm text-neutral-400">Pedido</p>
                    <h2 className="text-lg font-semibold tracking-wider">
                      {pedido.id.slice(0, 8)}...
                    </h2>

                    <div className="flex gap-6 mt-2 text-sm text-neutral-400">
                      <span>📅 {new Date(pedido.created_at).toLocaleDateString()}</span>
                      <span>💰 RD$ {pedido.total}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-right">
                    <StatusBadge
                      status={pedido.estado_nombre}
                      paymentStatus={pedido.payment_status_nombre}
                      statusColor={pedido.estado_color}
                      paymentStatusColor={pedido.payment_status_color}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-4">
                  <button
                    className="
                      px-5 py-2 rounded-lg text-sm
                      border border-white/10
                      bg-white/5
                      hover:bg-white/10
                      transition
                    "
                  >
                    Ver detalle
                  </button>

                  <button
                    className="
                      px-5 py-2 rounded-lg text-sm
                      border border-red-600/30
                      text-red-400
                      hover:bg-red-600/10
                      hover:border-red-600
                      transition
                    "
                  >
                    Reordenar
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}