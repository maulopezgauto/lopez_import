import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserRole, useUserPermissions } from '../hooks/usePermissions'

// Componente básico original - mantener para compatibilidad
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" />

  return children
}

/**
 * Componente para proteger rutas que requieren un rol específico
 * @param {React.ReactNode} children - Componentes a renderizar si tiene acceso
 * @param {string} rolRequerido - Nombre del rol requerido (ej: 'admin')
 * @param {React.ReactNode} fallback - Componente a mostrar si no tiene acceso (default: Navigate)
 */
export function ProtectedByRole({ children, rolRequerido, fallback }) {
  const { user, loading } = useAuth()
  const { esRol, cargando: cargandoRol } = useUserRole(user?.id)

  if (loading || cargandoRol) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!esRol(rolRequerido)) {
    return fallback || (
      <Navigate to="/private/lobby" />
    )
  }

  return children
}

/**
 * Componente para proteger rutas que requieren un permiso específico
 * @param {React.ReactNode} children - Componentes a renderizar si tiene acceso
 * @param {string|string[]} permisoRequerido - Código(s) de permiso(s) requerido(s)
 * @param {boolean} requiereToday - Si true, requiere TODOS los permisos. Si false, requiere AL MENOS UNO
 * @param {React.ReactNode} fallback - Componente a mostrar si no tiene acceso (default: Navigate)
 */
export function ProtectedByPermission({ 
  children, 
  permisoRequerido, 
  requiereToday = true,
  fallback 
}) {
  const { user, loading } = useAuth()
  const { tienePermiso, tienePermisos, tieneAlgunoPermiso, cargando } = useUserPermissions(user?.id)

  if (loading || cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  // Verificar permisos
  const tieneAcceso = Array.isArray(permisoRequerido) 
    ? (requiereToday ? tienePermisos(permisoRequerido) : tieneAlgunoPermiso(permisoRequerido))
    : tienePermiso(permisoRequerido)

  if (!tieneAcceso) {
    return fallback || (
      <Navigate to="/private/lobby" />
    )
  }

  return children
}

/**
 * Componente para proteger rutas por nivel de acceso
 * @param {React.ReactNode} children - Componentes a renderizar si tiene acceso
 * @param {number} nivelRequerido - Nivel de acceso requerido (1=user, 2=moderador, 3=admin, 4=super_admin)
 * @param {React.ReactNode} fallback - Componente a mostrar si no tiene acceso
 */
export function ProtectedByAccessLevel({ children, nivelRequerido, fallback }) {
  const { user, loading } = useAuth()
  const { tieneNivelAcceso, cargando: cargandoRol } = useUserRole(user?.id)

  if (loading || cargandoRol) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!tieneNivelAcceso(nivelRequerido)) {
    return fallback || (
      <Navigate to="/private/lobby" />
    )
  }

  return children
}

/**
 * Componente para mostrar/ocultar elementos basados en permisos
 * @param {React.ReactNode} children - Elemento a mostrar
 * @param {string|string[]} permisoRequerido - Código(s) de permiso(s)
 * @param {boolean} requiereToday - Si requiere todos o al menos uno
 */
export function IfHasPermission({ children, permisoRequerido, requiereToday = true }) {
  const { user } = useAuth()
  const { tienePermiso, tienePermisos, tieneAlgunoPermiso } = useUserPermissions(user?.id)

  const tieneAcceso = Array.isArray(permisoRequerido) 
    ? (requiereToday ? tienePermisos(permisoRequerido) : tieneAlgunoPermiso(permisoRequerido))
    : tienePermiso(permisoRequerido)

  return tieneAcceso ? children : null
}

/**
 * Componente para mostrar/ocultar elementos basados en rol
 * @param {React.ReactNode} children - Elemento a mostrar
 * @param {string} rolRequerido - Nombre del rol
 */
export function IfHasRole({ children, rolRequerido }) {
  const { user } = useAuth()
  const { esRol } = useUserRole(user?.id)

  return esRol(rolRequerido) ? children : null
}
