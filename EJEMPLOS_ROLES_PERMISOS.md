/**
 * EJEMPLOS DE USO DE ROLES Y PERMISOS
 * 
 * Este archivo muestra cómo usar los nuevos componentes y hooks para
 * implementar páginas administrativas protegidas por roles y permisos
 */

// ============================================
// EJEMPLO 1: Proteger una ruta por rol
// ============================================
import { ProtectedByRole } from '../components/protectedRoute'
import AdminDashboard from '../private/admin/AdminDashboard'

export function AdminDashboardRoute() {
  return (
    <ProtectedByRole rolRequerido="admin">
      <AdminDashboard />
    </ProtectedByRole>
  )
}

// ============================================
// EJEMPLO 2: Proteger una ruta por permiso
// ============================================
import { ProtectedByPermission } from '../components/protectedRoute'
import GestionUsuarios from '../private/admin/GestionUsuarios'

export function GestionUsuariosRoute() {
  return (
    <ProtectedByPermission permisoRequerido="usuarios.view">
      <GestionUsuarios />
    </ProtectedByPermission>
  )
}

// ============================================
// EJEMPLO 3: Usar hook de permisos en un componente
// ============================================
import { useUserPermissions } from '../hooks/usePermissions'
import { useAuth } from '../context/AuthContext'

export function ComponenteConPermisos() {
  const { user } = useAuth()
  const { tienePermiso, tienePermisos, tieneAlgunoPermiso } = useUserPermissions(user?.id)

  return (
    <div>
      {/* Solo mostrar si tiene permiso para ver usuarios */}
      {tienePermiso('usuarios.view') && (
        <button onClick={() => console.log('Ver usuarios')}>
          Ver Usuarios
        </button>
      )}

      {/* Solo mostrar si tiene permisos para crear y editar usuarios */}
      {tienePermisos(['usuarios.create', 'usuarios.edit']) && (
        <button onClick={() => console.log('Gestionar usuarios')}>
          Gestionar Usuarios
        </button>
      )}

      {/* Mostrar si tiene al menos uno de estos permisos */}
      {tieneAlgunoPermiso(['productos.create', 'productos.edit']) && (
        <button onClick={() => console.log('Modificar producto')}>
          Modificar Producto
        </button>
      )}
    </div>
  )
}

// ============================================
// EJEMPLO 4: Usar hook de rol en un componente
// ============================================
import { useUserRole } from '../hooks/usePermissions'

export function ComponenteConRol() {
  const { user } = useAuth()
  const { esRol, tieneNivelAcceso, rol } = useUserRole(user?.id)

  if (!rol) return <p>Cargando información de rol...</p>

  return (
    <div>
      <p>Tu rol: {rol.rol_nombre}</p>
      <p>Nivel de acceso: {rol.rol_nivel}</p>

      {/* Solo para administradores */}
      {esRol('admin') && (
        <div className="bg-blue-500/10 p-4 rounded-lg">
          <h2>Panel de Administración</h2>
          <p>Acceso a configuración avanzada</p>
        </div>
      )}

      {/* Para usuarios con nivel de acceso 2 o superior (moderador+) */}
      {tieneNivelAcceso(2) && (
        <div className="bg-purple-500/10 p-4 rounded-lg">
          <h2>Herramientas de Moderación</h2>
        </div>
      )}
    </div>
  )
}

// ============================================
// EJEMPLO 5: Componentes condicionales simples
// ============================================
import { IfHasPermission, IfHasRole } from '../components/protectedRoute'

export function MenuAdmin() {
  return (
    <nav className="flex gap-4">
      <IfHasPermission permisoRequerido="usuarios.view">
        <a href="/admin/usuarios">Gestionar Usuarios</a>
      </IfHasPermission>

      <IfHasPermission permisoRequerido="productos.edit">
        <a href="/admin/productos">Gestionar Productos</a>
      </IfHasPermission>

      <IfHasPermission permisoRequerido="pedidos.editStatus">
        <a href="/admin/pedidos">Gestionar Pedidos</a>
      </IfHasPermission>

      <IfHasRole rolRequerido="super_admin">
        <a href="/admin/configuracion">Configuración Sistema</a>
      </IfHasRole>
    </nav>
  )
}

// ============================================
// EJEMPLO 6: Tabla de permisos por rol (para referencia)
// ============================================
/*
ROLES Y SUS NIVELES DE ACCESO:
- user (nivel 1): Usuario regular
- moderador (nivel 2): Puede moderar contenido y gestionar órdenes básicas
- admin (nivel 3): Administrador del sistema, acceso a casi todo
- super_admin (nivel 4): Super administrador con acceso total

PERMISOS DISPONIBLES:

=== USUARIOS ===
- users.view: Ver usuarios
- users.create: Crear nuevo usuario
- users.edit: Editar información de usuario
- users.delete: Eliminar usuario del sistema
- users.viewRole: Visualizar rol asignado
- users.assignRole: Asignar rol a usuario

=== PRODUCTOS ===
- productos.view: Visualizar lista de productos
- productos.create: Crear nuevo producto
- productos.edit: Editar información de producto
- productos.delete: Eliminar producto
- productos.stock: Modificar stock de productos

=== PEDIDOS ===
- pedidos.view: Visualizar pedidos
- pedidos.editStatus: Cambiar estado del pedido
- pedidos.viewDetail: Ver detalles completos

=== PAGOS ===
- pagos.view: Visualizar registros de pago
- pagos.refund: Procesar reembolso

=== CONFIGURACIÓN ===
- config.view: Acceder a configuración del sistema
- config.edit: Modificar configuración del sistema

=== REPORTES ===
- reports.view: Acceder a reportes del sistema
- reports.download: Descargar datos de reportes

ASIGNACIONES PREDETERMINADAS POR ROL:
user:      [products.view, pedidos.view, users.viewRole]
moderador: [usuarios.view, productos.view, pedidos.view, pedidos.editStatus, pedidos.viewDetail, pagos.view]
admin:     Todos excepto config.edit
super_admin: Todos los permisos
*/

// ============================================
// EJEMPLO 7: Configurar rutas en main.jsx
// ============================================
/*
import { ProtectedByPermission, ProtectedByRole } from './components/protectedRoute'
import AdminDashboard from './private/admin/AdminDashboard'
import GestionUsuarios from './private/admin/GestionUsuarios'
import GestionProductos from './private/admin/GestionProductos'

// En tu Router:
<Route 
  path="/admin" 
  element={
    <ProtectedByRole rolRequerido="admin">
      <AdminDashboard />
    </ProtectedByRole>
  }
/>

<Route 
  path="/admin/usuarios" 
  element={
    <ProtectedByPermission permisoRequerido="usuarios.view">
      <GestionUsuarios />
    </ProtectedByPermission>
  }
/>

<Route 
  path="/admin/productos" 
  element={
    <ProtectedByPermission permisoRequerido={['productos.view', 'productos.edit']} requiereToday={false}>
      <GestionProductos />
    </ProtectedByPermission>
  }
/>
*/