-- Script para gestionar roles y permisos de usuarios
-- Ejecutar en SQL Editor de Supabase

-- ============================================
-- ASIGNAR ROLES A USUARIOS
-- ============================================

-- Asignar un usuario como administrador
INSERT INTO usuario_roles (usuario_id, rol_id) 
SELECT id, (SELECT id FROM roles WHERE nombre = 'admin')
FROM usuarios
WHERE email = 'tu_email@ejemplo.com'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;

-- Asignar un usuario como moderador
INSERT INTO usuario_roles (usuario_id, rol_id) 
SELECT id, (SELECT id FROM roles WHERE nombre = 'moderador')
FROM usuarios
WHERE email = 'otro_email@ejemplo.com'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;

-- Asignar un usuario como super_admin
INSERT INTO usuario_roles (usuario_id, rol_id) 
SELECT id, (SELECT id FROM roles WHERE nombre = 'super_admin')
FROM usuarios
WHERE email = 'super_admin@ejemplo.com'
ON CONFLICT (usuario_id, rol_id) DO NOTHING;

-- ============================================
-- VER TODOS LOS USUARIOS CON SUS ROLES
-- ============================================
SELECT
  u.email,
  u.nombre,
  u.apellido,
  r.nombre as rol,
  r.nivel_acceso,
  ur.asignado_en
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id
ORDER BY u.email;

-- ============================================
-- VER PERMISOS DE UN USUARIO ESPECÍFICO
-- ============================================
SELECT DISTINCT
  p.nombre as permiso,
  p.codigo,
  p.categoria,
  r.nombre as rol
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id = ur.usuario_id
LEFT JOIN roles r ON ur.rol_id = r.id
LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
LEFT JOIN permisos p ON rp.permiso_id = p.id
WHERE u.email = 'tu_email@ejemplo.com'
ORDER BY p.categoria, p.nombre;

-- ============================================
-- VER TODOS LOS PERMISOS POR ROL
-- ============================================
SELECT
  r.nombre as rol,
  r.descripcion,
  p.nombre as permiso,
  p.codigo,
  p.descripcion as permiso_descripcion,
  p.categoria
FROM roles r
LEFT JOIN rol_permisos rp ON r.id = rp.rol_id
LEFT JOIN permisos p ON rp.permiso_id = p.id
WHERE r.activo = true
ORDER BY r.nivel_acceso DESC, p.categoria, p.nombre;

-- ============================================
-- REMOVER UN ROL A UN USUARIO
-- ============================================
DELETE FROM usuario_roles
WHERE usuario_id = (SELECT id FROM usuarios WHERE email = 'tu_email@ejemplo.com')
AND rol_id = (SELECT id FROM roles WHERE nombre = 'admin');

-- ============================================
-- CAMBIAR TODOS LOS USUARIOS NORMALES A 'user' ROLE (si aún no tienen rol)
-- ============================================
INSERT INTO usuario_roles (usuario_id, rol_id)
SELECT 
  u.id,
  (SELECT id FROM roles WHERE nombre = 'user')
FROM usuarios u
WHERE u.id NOT IN (SELECT usuario_id FROM usuario_roles)
ON CONFLICT (usuario_id, rol_id) DO NOTHING;

-- ============================================
-- CREAR UN NUEVO PERMISO
-- ============================================
INSERT INTO permisos (nombre, descripcion, codigo, categoria) VALUES
('Nuevo permiso', 'Descripción del nuevo permiso', 'categoria.permiso', 'categoria')
ON CONFLICT (codigo) DO NOTHING;

-- ============================================
-- ASIGNAR UN PERMISO A UN ROL
-- ============================================
INSERT INTO rol_permisos (rol_id, permiso_id)
SELECT 
  (SELECT id FROM roles WHERE nombre = 'admin'),
  (SELECT id FROM permisos WHERE codigo = 'categoria.permiso')
ON CONFLICT (rol_id, permiso_id) DO NOTHING;

-- ============================================
-- ESTADÍSTICAS DE USUARIOS POR ROL
-- ============================================
SELECT
  r.nombre as rol,
  COUNT(DISTINCT ur.usuario_id) as total_usuarios
FROM roles r
LEFT JOIN usuario_roles ur ON r.id = ur.rol_id
GROUP BY r.id, r.nombre
ORDER BY r.nivel_acceso DESC;