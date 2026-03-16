-- Script para crear tablas de roles y permisos
-- Ejecutar en SQL Editor de Supabase

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL,
  descripcion TEXT,
  nivel_acceso INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar roles por defecto
INSERT INTO roles (nombre, descripcion, nivel_acceso) VALUES
('user', 'Usuario regular', 1),
('moderador', 'Moderador del sistema', 2),
('admin', 'Administrador del sistema', 3),
('super_admin', 'Super administrador con acceso total', 4)
ON CONFLICT (nombre) DO NOTHING;

-- Tabla de permisos
CREATE TABLE IF NOT EXISTS permisos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  codigo VARCHAR(100) UNIQUE NOT NULL,
  categoria VARCHAR(50),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar permisos por defecto
INSERT INTO permisos (nombre, descripcion, codigo, categoria) VALUES
-- Gestión de usuarios
('Ver usuarios', 'Visualizar lista de usuarios', 'users.view', 'usuarios'),
('Crear usuario', 'Crear nuevo usuario', 'users.create', 'usuarios'),
('Editar usuario', 'Editar información de usuario', 'users.edit', 'usuarios'),
('Eliminar usuario', 'Eliminar usuario del sistema', 'users.delete', 'usuarios'),
('Ver rol de usuario', 'Visualizar rol asignado', 'users.viewRole', 'usuarios'),
('Asignar rol', 'Asignar rol a usuario', 'users.assignRole', 'usuarios'),

-- Gestión de productos
('Ver productos', 'Visualizar lista de productos', 'productos.view', 'productos'),
('Crear producto', 'Crear nuevo producto', 'productos.create', 'productos'),
('Editar producto', 'Editar información de producto', 'productos.edit', 'productos'),
('Eliminar producto', 'Eliminar producto', 'productos.delete', 'productos'),
('Gestionar stock', 'Modificar stock de productos', 'productos.stock', 'productos'),

-- Gestión de pedidos
('Ver pedidos', 'Visualizar pedidos', 'pedidos.view', 'pedidos'),
('Editar estado pedido', 'Cambiar estado del pedido', 'pedidos.editStatus', 'pedidos'),
('Ver detalle pedido', 'Ver detalles completos del pedido', 'pedidos.viewDetail', 'pedidos'),

-- Gestión de pagos
('Ver pagos', 'Visualizar registros de pago', 'pagos.view', 'pagos'),
('Reembolsar pago', 'Procesar reembolso', 'pagos.refund', 'pagos'),

-- Gestión de configuración
('Ver configuración', 'Acceder a configuración del sistema', 'config.view', 'configuracion'),
('Editar configuración', 'Modificar configuración del sistema', 'config.edit', 'configuracion'),

-- Reportes y análisis
('Ver reportes', 'Acceder a reportes del sistema', 'reports.view', 'reportes'),
('Descargar reportes', 'Descargar datos de reportes', 'reports.download', 'reportes')
ON CONFLICT (codigo) DO NOTHING;

-- Tabla de relación entre roles y permisos
CREATE TABLE IF NOT EXISTS rol_permisos (
  id SERIAL PRIMARY KEY,
  rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permiso_id INTEGER NOT NULL REFERENCES permisos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(rol_id, permiso_id)
);

-- Tabla de relación entre usuarios y roles
CREATE TABLE IF NOT EXISTS usuario_roles (
  id SERIAL PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  asignado_por UUID,
  asignado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(usuario_id, rol_id)
);

-- Asignar permisos a roles por defecto

-- Usuario regular: solo ver productos y ver sus propios pedidos
INSERT INTO rol_permisos (rol_id, permiso_id) 
SELECT r.id, p.id FROM roles r, permisos p 
WHERE r.nombre = 'user' AND p.codigo IN (
  'prodcutos.view', 'pedidos.view', 'users.viewRole'
)
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

-- Moderador: gestión de pedidos y usuarios básica
INSERT INTO rol_permisos (rol_id, permiso_id)
SELECT r.id, p.id FROM roles r, permisos p
WHERE r.nombre = 'moderador' AND p.codigo IN (
  'usuarios.view', 'productos.view', 'pedidos.view', 
  'pedidos.editStatus', 'pedidos.viewDetail', 'pagos.view'
)
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

-- Administrador: acceso completo excepto super_admin features
INSERT INTO rol_permisos (rol_id, permiso_id)
SELECT r.id, p.id FROM roles r, permisos p
WHERE r.nombre = 'admin' AND p.codigo NOT IN (
  'config.edit'
)
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

-- Super administrador: todos los permisos
INSERT INTO rol_permisos (rol_id, permiso_id)
SELECT r.id, p.id FROM roles r, permisos p
WHERE r.nombre = 'super_admin'
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_usuario_roles_usuario_id ON usuario_roles(usuario_id);
CREATE INDEX IF NOT EXISTS idx_usuario_roles_rol_id ON usuario_roles(rol_id);
CREATE INDEX IF NOT EXISTS idx_rol_permisos_rol_id ON rol_permisos(rol_id);
CREATE INDEX IF NOT EXISTS idx_rol_permisos_permiso_id ON rol_permisos(permiso_id);
CREATE INDEX IF NOT EXISTS idx_permisos_codigo ON permisos(codigo);
CREATE INDEX IF NOT EXISTS idx_roles_nombre ON roles(nombre);

-- Crear vista útil: usuarios con sus roles
CREATE OR REPLACE VIEW usuarios_completos AS
SELECT
  u.id,
  u.email,
  u.nombre,
  u.apellido,
  u.avatar_url,
  u.activo,
  r.id as rol_id,
  r.nombre as rol_nombre,
  r.descripcion as rol_descripcion,
  r.nivel_acceso as rol_nivel,
  u.created_at,
  u.updated_at
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id;

-- Crear vista útil: permisos de un rol
CREATE OR REPLACE VIEW rol_permisos_detalle AS
SELECT
  r.id as rol_id,
  r.nombre as rol_nombre,
  p.id as permiso_id,
  p.nombre as permiso_nombre,
  p.codigo as permiso_codigo,
  p.categoria as permiso_categoria,
  p.descripcion as permiso_descripcion
FROM roles r
LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
LEFT JOIN permisos p ON rp.permiso_id = p.id
ORDER BY r.nivel_acceso DESC, p.categoria, p.nombre;

-- Crear vista útil: permisos de un usuario (a través de sus roles)
CREATE OR REPLACE VIEW usuario_permisos AS
SELECT DISTINCT
  u.id as usuario_id,
  u.email as usuario_email,
  r.nombre as rol_nombre,
  p.codigo as permiso_codigo,
  p.nombre as permiso_nombre,
  p.categoria as permiso_categoria
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id
LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
LEFT JOIN permisos p ON rp.permiso_id = p.id
ORDER BY u.email, r.nivel_acceso DESC;

-- Comentarios
COMMENT ON TABLE roles IS 'Roles del sistema (user, moderador, admin, etc.)';
COMMENT ON TABLE permisos IS 'Permisos disponibles en el sistema';
COMMENT ON TABLE usuario_roles IS 'Asignación de roles a usuarios';
COMMENT ON TABLE rol_permisos IS 'Asignación de permisos a roles';
COMMENT ON VIEW usuarios_completos IS 'Vista de usuarios con información de roles';
COMMENT ON VIEW rol_permisos_detalle IS 'Vista detallada de permisos por rol';
COMMENT ON VIEW usuario_permisos IS 'Vista de permisos de cada usuario';