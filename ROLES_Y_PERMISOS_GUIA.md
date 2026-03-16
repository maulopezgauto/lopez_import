# 🔐 Sistema de Roles y Permisos

Este documento explica la estructura completa de roles y permisos que se ha implementado en tu sistema.

## 📋 Tabla de Contenidos

1. [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
2. [Roles Disponibles](#roles-disponibles)
3. [Permisos Disponibles](#permisos-disponibles)
4. [Cómo Usar en el Frontend](#cómo-usar-en-el-frontend)
5. [Scripts SQL Útiles](#scripts-sql-útiles)

---

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

#### `roles`
Contiene los roles disponibles en el sistema.

```
id (SERIAL PK)
nombre (VARCHAR, UNIQUE) - Ej: 'admin', 'user', 'moderador'
descripcion (TEXT)
nivel_acceso (INTEGER) - 1=user, 2=moderador, 3=admin, 4=super_admin
activo (BOOLEAN)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

#### `permisos`
Contiene todos los permisos disponibles.

```
id (SERIAL PK)
nombre (VARCHAR, UNIQUE) - Ej: 'Ver usuarios'
descripcion (TEXT)
codigo (VARCHAR, UNIQUE) - Ej: 'users.view' (se usa en el código)
categoria (VARCHAR) - Ej: 'usuarios', 'productos'
activo (BOOLEAN)
created_at (TIMESTAMP)
```

#### `usuario_roles` (Junction Table)
Relaciona usuarios con roles (N:N).

```
id (SERIAL PK)
usuario_id (UUID FK -> usuarios)
rol_id (INTEGER FK -> roles)
asignado_por (UUID)
asignado_en (TIMESTAMP)
UNIQUE(usuario_id, rol_id)
```

#### `rol_permisos` (Junction Table)
Relaciona roles con permisos (N:N).

```
id (SERIAL PK)
rol_id (INTEGER FK -> roles)
permiso_id (INTEGER FK -> permisos)
created_at (TIMESTAMP)
UNIQUE(rol_id, permiso_id)
```

### Vistas Útiles

#### `usuarios_completos`
Usuarios con información de sus roles.

```sql
SELECT 
  u.id, u.email, u.nombre, u.apellido,
  r.nombre as rol_nombre,
  r.nivel_acceso as rol_nivel
FROM usuarios u
LEFT JOIN usuario_roles ur ON...
LEFT JOIN roles r ON...
```

#### `usuario_permisos`
Todos los permisos de un usuario (a través de sus roles).

```sql
SELECT
  u.id, u.email,
  p.codigo as permiso_codigo,
  p.nombre as permiso_nombre,
  p.categoria
FROM usuarios u
LEFT JOIN usuario_roles ur ON...
LEFT JOIN roles r ON...
LEFT JOIN rol_permisos rp ON...
LEFT JOIN permisos p ON...
```

#### `rol_permisos_detalle`
Todos los permisos de cada rol.

```sql
SELECT
  r.nombre as rol_nombre,
  p.codigo as permiso_codigo,
  p.nombre as permiso_nombre,
  p.categoria
FROM roles r
LEFT JOIN rol_permisos rp ON...
LEFT JOIN permisos p ON...
```

---

## 👥 Roles Disponibles

| Rol | Nivel | Descripción | Acceso |
|-----|-------|-------------|--------|
| **user** | 1 | Usuario regular | Solo ver productos y sus pedidos |
| **moderador** | 2 | Moderador del sistema | Gestión de pedidos, ver usuarios/productos, reportes |
| **admin** | 3 | Administrador | Acceso a casi todo (excepto config.edit) |
| **super_admin** | 4 | Super administrador | Acceso total al sistema |

---

## 🔑 Permisos Disponibles

### Gestión de Usuarios
- `users.view` - Ver usuarios
- `users.create` - Crear nuevo usuario
- `users.edit` - Editar información de usuario
- `users.delete` - Eliminar usuario
- `users.viewRole` - Ver rol asignado
- `users.assignRole` - Asignar rol a usuario

### Gestión de Productos
- `productos.view` - Ver productos
- `productos.create` - Crear producto
- `productos.edit` - Editar producto
- `productos.delete` - Eliminar producto
- `productos.stock` - Modificar stock

### Gestión de Pedidos
- `pedidos.view` - Ver pedidos
- `pedidos.editStatus` - Cambiar estado
- `pedidos.viewDetail` - Ver detalles completos

### Gestión de Pagos
- `pagos.view` - Ver pagos
- `pagos.refund` - Procesar reembolso

### Configuración
- `config.view` - Ver configuración
- `config.edit` - Editar configuración

### Reportes
- `reports.view` - Ver reportes
- `reports.download` - Descargar datos

---

## 🛠️ Cómo Usar en el Frontend

### 1. Envolver la app con RoleProvider

En tu `main.jsx`:

```jsx
import { RoleProvider } from './context/RoleContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  <AuthProvider>
    <RoleProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </RoleProvider>
  </AuthProvider>,
  document.getElementById('root')
)
```

### 2. Proteger Rutas por Rol

```jsx
import { ProtectedByRole } from './components/protectedRoute'
import AdminPanel from './private/admin/AdminPanel'

<Route 
  path="/admin" 
  element={
    <ProtectedByRole rolRequerido="admin">
      <AdminPanel />
    </ProtectedByRole>
  }
/>
```

### 3. Proteger Rutas por Permiso

```jsx
import { ProtectedByPermission } from './components/protectedRoute'
import GestionUsuarios from './private/admin/GestionUsuarios'

<Route 
  path="/admin/usuarios" 
  element={
    <ProtectedByPermission permisoRequerido="usuarios.view">
      <GestionUsuarios />
    </ProtectedByPermission>
  }
/>
```

### 4. Usar Hooks en Componentes

#### Verificar Permisos

```jsx
import { useUserPermissions } from './hooks/usePermissions'
import { useAuth } from './context/AuthContext'

export function MiComponente() {
  const { user } = useAuth()
  const { tienePermiso, tienePermisos } = useUserPermissions(user?.id)

  return (
    <div>
      {tienePermiso('usuarios.view') && (
        <button>Ver Usuarios</button>
      )}
      
      {tienePermisos(['usuarios.create', 'usuarios.edit']) && (
        <button>Crear/Editar Usuario</button>
      )}
    </div>
  )
}
```

#### Verificar Rol

```jsx
import { useUserRole } from './hooks/usePermissions'

export function OtroComponente() {
  const { user } = useAuth()
  const { esRol, tieneNivelAcceso } = useUserRole(user?.id)

  return (
    <div>
      {esRol('admin') && <p>Eres administrador</p>}
      
      {tieneNivelAcceso(2) && <p>Tienes nivel moderador+</p>}
    </div>
  )
}
```

### 5. Componentes Condicionales Simples

```jsx
import { IfHasPermission, IfHasRole } from './components/protectedRoute'

<nav>
  <IfHasPermission permisoRequerido="usuarios.view">
    <a href="/admin/usuarios">Usuarios</a>
  </IfHasPermission>

  <IfHasRole rolRequerido="super_admin">
    <a href="/admin/config">Configuración</a>
  </IfHasRole>
</nav>
```

---

## 📊 Scripts SQL Útiles

### Asignar un Usuario como Admin

```sql
INSERT INTO usuario_roles (usuario_id, rol_id) 
SELECT id, (SELECT id FROM roles WHERE nombre = 'admin')
FROM usuarios
WHERE email = 'tu_email@ejemplo.com'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;
```

### Ver Todos los Usuarios con sus Roles

```sql
SELECT
  u.email,
  u.nombre,
  r.nombre as rol
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id
ORDER BY u.email;
```

### Ver Permisos de un Usuario

```sql
SELECT DISTINCT
  p.nombre,
  p.codigo,
  p.categoria
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id
LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
LEFT JOIN permisos p ON rp.permiso_id = p.id
WHERE u.email = 'tu_email@ejemplo.com';
```

### Cambiar Rol de un Usuario

```sql
-- Remover rol actual
DELETE FROM usuario_roles
WHERE usuario_id = (SELECT id FROM usuarios WHERE email = 'email@ejemplo.com');

-- Asignar nuevo rol
INSERT INTO usuario_roles (usuario_id, rol_id)
SELECT 
  id,
  (SELECT id FROM roles WHERE nombre = 'moderador')
FROM usuarios
WHERE email = 'email@ejemplo.com';
```

---

## 🚀 Pasos para Implementar

1. **Ejecuta el script principal** en Supabase:
   ```
   create_roles_tables.sql
   ```

2. **Actualiza AuthContext** (si es necesario) para cargar información de rol del usuario

3. **Envuelve tu App** con `RoleProvider`:
   ```jsx
   <RoleProvider>
     <YourApp />
   </RoleProvider>
   ```

4. **Protege tus rutas** usando los componentes:
   ```jsx
   <ProtectedByRole rolRequerido="admin">
     <AdminPanel />
   </ProtectedByRole>
   ```

5. **Asigna roles a usuarios** usando el script `manage_roles_usuarios.sql`

6. **Crea tus páginas administrativas** usando los hooks y componentes

---

## 📝 Notas Importantes

- **Super admin** es el único rol que puede cambiar configuración del sistema
- Los permisos se heredan a través de los roles (un administrador tiene todos los permisos de usuario)
- Los ni veles de acceso sirven para validaciones rápidas sin verificar permisos específicos
- Las vistas en la BD hacen que sea fácil consultar información de roles y permisos sin JOINs complejos

---

## 🔗 Archivos Relacionados

- `create_roles_tables.sql` - Script de creación de tablas
- `manage_roles_usuarios.sql` - Scripts de gestión
- `src/context/RoleContext.jsx` - Contexto de roles
- `src/hooks/usePermissions.js` - Hooks para permisos y roles
- `src/components/protectedRoute.jsx` - Componentes de protección
- `EJEMPLOS_ROLES_PERMISOS.md` - Ejemplos de uso