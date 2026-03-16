import React from 'react'

export const StatusBadge = ({ status, paymentStatus, statusColor, paymentStatusColor }) => {
  const getStatusConfig = (estado, paymentStatus, statusColor, paymentStatusColor) => {
    // Si tenemos colores de BD, usarlos
    if (statusColor && paymentStatusColor) {
      // Determinar cuál estado mostrar prioritariamente
      if (paymentStatus === 'failed' || paymentStatus === 'cancelled') {
        return {
          label: paymentStatus === 'failed' ? 'Pago Rechazado' : 'Pago Cancelado',
          color: `bg-red-500/15 text-red-400 border-red-500/30`,
          icon: '❌'
        }
      }

      if (paymentStatus === 'pending') {
        return {
          label: 'Pendiente de Pago',
          color: `bg-yellow-500/15 text-yellow-400 border-yellow-500/30`,
          icon: '⏳'
        }
      }

      // Para estados de entrega, usar el color del estado de pedido
      const colorMap = {
        '#F59E0B': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
        '#3B82F6': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        '#8B5CF6': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
        '#10B981': 'bg-green-500/15 text-green-400 border-green-500/30',
        '#059669': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        '#EF4444': 'bg-red-500/15 text-red-400 border-red-500/30'
      }

      return {
        label: estado || 'Estado Desconocido',
        color: colorMap[statusColor] || 'bg-gray-500/15 text-gray-400 border-gray-500/30',
        icon: getIconForStatus(estado)
      }
    }

    // Fallback a lógica anterior si no hay colores de BD
    // Estados de pago
    if (paymentStatus === 'failed') {
      return {
        label: 'Pago Rechazado',
        color: 'bg-red-500/15 text-red-400 border-red-500/30',
        icon: '❌'
      }
    }

    if (paymentStatus === 'pending') {
      return {
        label: 'Pendiente de Pago',
        color: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
        icon: '⏳'
      }
    }

    // Estados de entrega (solo si pago está completado)
    switch (estado) {
      case 'pagado':
        return {
          label: 'Pagado - Preparando',
          color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          icon: '✅'
        }
      case 'procesando':
        return {
          label: 'Procesando Pedido',
          color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          icon: '🔄'
        }
      case 'enviado':
        return {
          label: 'Enviado',
          color: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
          icon: '🚚'
        }
      case 'en_camino':
        return {
          label: 'En Camino',
          color: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          icon: '📍'
        }
      case 'entregado':
        return {
          label: 'Entregado',
          color: 'bg-green-500/15 text-green-400 border-green-500/30',
          icon: '🎉'
        }
      case 'cancelado':
        return {
          label: 'Cancelado',
          color: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
          icon: '🚫'
        }
      default:
        return {
          label: 'Estado Desconocido',
          color: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
          icon: '❓'
        }
    }
  }

  const getIconForStatus = (estado) => {
    switch (estado) {
      case 'pendiente_pago': return '⏳'
      case 'procesando': return '🔄'
      case 'empaquetando': return '📦'
      case 'en_camino': return '🚚'
      case 'entregado': return '🎉'
      case 'cancelado': return '🚫'
      default: return '❓'
    }
  }

  const config = getStatusConfig(status, paymentStatus, statusColor, paymentStatusColor)

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
      border ${config.color}
    `}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  )
}

export default StatusBadge