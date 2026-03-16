import { useState, useEffect } from 'react'
import { supabase } from '../config/services/supabase'

/**
 * Hook para obtener y verificar permisos de un usuario
 * @param {string} usuarioId - ID del usuario
 * @returns {Object} { permisos, tienePermiso, cargando, error }
 */
export function useUserPermissions(usuarioId) {
  const [permisos, setPermisos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!usuarioId) {
      setCargando(false)
      return
    }

    const fetchPermisos = async () => {
      try {
        const { data, error: err } = await supabase
          .from('usuario_permisos')
          .select('permiso_codigo')
          .eq('usuario_id', usuarioId)

        if (err) throw err

        const codigosPermiso = data?.map(p => p.permiso_codigo) || []
        setPermisos(codigosPermiso)
      } catch (err) {
        console.error('Error fetching usuario_permisos:', err)
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    fetchPermisos()
  }, [usuarioId])

  /**
   * Verifica si el usuario tiene un permiso específico
   * @param {string} codigoPermiso - Código del permiso a verificar (ej: 'users.view')
   * @returns {boolean}
   */
  const tienePermiso = (codigoPermiso) => {
    return permisos.includes(codigoPermiso)
  }

  /**
   * Verifica si el usuario tiene TODOS los permisos indicados
   * @param {string[]} codigosPermiso - Array de códigos de permiso
   * @returns {boolean}
   */
  const tienePermisos = (codigosPermiso) => {
    return codigosPermiso.every(codigo => permisos.includes(codigo))
  }

  /**
   * Verifica si el usuario tiene AL MENOS UNO de los permisos indicados
   * @param {string[]} codigosPermiso - Array de códigos de permiso
   * @returns {boolean}
   */
  const tieneAlgunoPermiso = (codigosPermiso) => {
    return codigosPermiso.some(codigo => permisos.includes(codigo))
  }

  return {
    permisos,
    tienePermiso,
    tienePermisos,
    tieneAlgunoPermiso,
    cargando,
    error
  }
}

/**
 * Hook para obtener el rol de un usuario
 * @param {string} usuarioId - ID del usuario
 * @returns {Object} { rol, cargando, error }
 */
export function useUserRole(usuarioId) {
  const [rol, setRol] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!usuarioId) {
      setCargando(false)
      return
    }

    const fetchRol = async () => {
      try {
        const { data, error: err } = await supabase
          .from('usuarios_completos')
          .select('rol_nombre, rol_id, rol_nivel')
          .eq('id', usuarioId)
          .single()

        if (err) throw err
        setRol(data)
      } catch (err) {
        console.error('Error fetching usuario_roles:', err)
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    fetchRol()
  }, [usuarioId])

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} nombreRol - Nombre del rol (ej: 'admin')
   * @returns {boolean}
   */
  const esRol = (nombreRol) => {
    return rol?.rol_nombre === nombreRol
  }

  /**
   * Verifica si el usuario tiene nivel de acceso mayor o igual al indicado
   * @param {number} nivelRequerido - Nivel de acceso requerido
   * @returns {boolean}
   */
  const tieneNivelAcceso = (nivelRequerido) => {
    return (rol?.rol_nivel || 0) >= nivelRequerido
  }

  return {
    rol,
    esRol,
    tieneNivelAcceso,
    cargando,
    error
  }
}