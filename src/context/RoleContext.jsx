import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/services/supabase'

const RoleContext = createContext()

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState([])
  const [permisos, setPermisos] = useState([])
  const [loadingRoles, setLoadingRoles] = useState(true)

  // Cargar roles y permisos disponibles
  useEffect(() => {
    const loadRolesAndPermisos = async () => {
      try {
        const { data: rolesData, error: rolesError } = await supabase
          .from('roles')
          .select('*')
          .eq('activo', true)

        const { data: permisosData, error: permisosError } = await supabase
          .from('permisos')
          .select('*')
          .eq('activo', true)

        if (rolesError) throw rolesError
        if (permisosError) throw permisosError

        setRoles(rolesData || [])
        setPermisos(permisosData || [])
      } catch (error) {
        console.error('Error loading roles/permisos:', error)
      } finally {
        setLoadingRoles(false)
      }
    }

    loadRolesAndPermisos()
  }, [])

  return (
    <RoleContext.Provider value={{ roles, permisos, loadingRoles }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRoles = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRoles debe usarse dentro de RoleProvider')
  }
  return context
}