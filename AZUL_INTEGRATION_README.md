# Integración con AZUL - Plataforma de Pagos Dominicana

Este documento explica cómo integrar la plataforma de pagos AZUL en tu aplicación Lopez Import.

## 🚀 ¿Qué es AZUL?

AZUL es la plataforma de pagos más utilizada en República Dominicana, procesando millones de transacciones diariamente con tarjetas de crédito, débito y otros métodos de pago locales.

## 📋 Requisitos Previos

1. **Afiliación a AZUL**: Debes afiliarte como comercio en https://portal.azul.com.do/
2. **Cuenta de Pruebas**: AZUL proporciona un ambiente de pruebas para desarrollo
3. **Credenciales**: Recibirás las credenciales necesarias después de la afiliación

## ⚙️ Configuración

### 1. Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura las siguientes variables:

```env
# Credenciales de AZUL (se obtienen al afiliarse)
VITE_AZUL_AUTH1=tu_auth1_aqui
VITE_AZUL_AUTH2=tu_auth2_aqui
VITE_AZUL_MERCHANT_ID=tu_merchant_id_aqui
VITE_AZUL_CHANNEL=EC

# Ambiente (false para pruebas, true para producción)
VITE_AZUL_PRODUCTION=false

# Clave de autenticación para hash de seguridad
VITE_AZUL_AUTH_KEY=tu_clave_auth_aqui
```

### 2. Credenciales de Prueba

Para el ambiente de pruebas, AZUL proporciona credenciales por defecto:
- **Auth1**: AZUL
- **Auth2**: AZUL
- **Merchant ID**: 3900000000
- **Channel**: EC

### 3. Tarjetas de Prueba

AZUL proporciona estas tarjetas para testing:

| Tipo | Número | Expiración | CVC |
|------|--------|------------|-----|
| Visa | 4260000000000000 | 12/2021 | 123 |
| Mastercard | 5457210001000019 | 12/2021 | 123 |

## 🔧 Archivos Implementados

### 1. `src/config/azul.js`
Configuración central de AZUL con URLs, credenciales y parámetros.

### 2. `src/services/azulPaymentService.js`
Servicio principal que maneja todas las operaciones con la API de AZUL:
- Procesamiento de pagos
- Verificación de transacciones
- Anulación de pagos
- Reembolsos

### 3. `src/components/AzulPaymentForm.jsx`
Componente React para el formulario de pago con:
- Validación de datos de tarjeta
- Formateo automático
- Mensajes de error y éxito
- Interfaz de usuario intuitiva

### 4. `src/components/CheckoutForm.jsx` (Actualizado)
Formulario de checkout que permite elegir entre AZUL y Stripe.

## 💳 Flujo de Pago

1. **Usuario selecciona productos** → Carrito
2. **Usuario va al checkout** → Selecciona método de pago
3. **Usuario elige AZUL** → Aparece formulario de tarjeta
4. **Usuario ingresa datos** → Validación automática
5. **Usuario confirma pago** → Envío a API de AZUL
6. **AZUL procesa pago** → Respuesta de aprobación/declinación
7. **Redirección automática** → Página de éxito o error

## 🔒 Seguridad

- **Encriptación SSL/TLS 1.2+**: Todos los datos viajan cifrados
- **Certificados Digitales**: Autenticación mutua con AZUL
- **Validación de Datos**: Formato correcto de tarjetas y montos
- **Sin Almacenamiento**: Datos de tarjeta no se guardan localmente

## 🧪 Testing

### Ambiente de Pruebas
- URL: `https://pruebas.azul.com.do/webservices/JSON/Default.aspx`
- Todas las transacciones son simuladas
- No se procesan pagos reales

### Casos de Prueba
1. **Pago Aprobado**: Usa tarjetas de prueba válidas
2. **Pago Declinado**: AZUL puede simular rechazos
3. **Validación de Datos**: Prueba con datos inválidos
4. **Timeout**: Verifica manejo de errores de conexión

## 📊 Códigos de Respuesta

### Respuestas Exitosas
- `00`: Aprobada
- `3D`: Requiere autenticación 3DS

### Respuestas de Error
- `05`: Declinada
- `14`: Número de tarjeta inválido
- `51`: Fondos insuficientes

## 🚀 Producción

### Checklist Antes de Producción

- [ ] Credenciales de producción configuradas
- [ ] Variable `VITE_AZUL_PRODUCTION=true`
- [ ] URLs apuntando a producción
- [ ] Certificados SSL válidos
- [ ] Testing exhaustivo en ambiente de pruebas
- [ ] Cumplimiento PCI DSS verificado

### URLs de Producción
- API: `https://pagos.azul.com.do/webservices/JSON/Default.aspx`
- Portal: `https://portal.azul.com.do/`

## 🆘 Soporte

### AZUL Support
- **Centro de Ayuda**: https://www.azul.com.do/Pages/es/centro-de-ayuda.aspx
- **Teléfono**: 809-544-2985
- **Email**: vozdelcliente@azul.com.do

### Documentación Técnica
- **Portal Desarrolladores**: https://dev.azul.com.do/
- **Documentos**: https://dev.azul.com.do/Pages/developer/pages/documents/index.aspx

## 🔄 Próximos Pasos

1. **Tokenización**: Implementar bóveda de datos para pagos recurrentes
2. **3D Secure**: Agregar autenticación avanzada
3. **Pagos Recurrentes**: Suscripciones automáticas
4. **DCC**: Conversión dinámica de monedas

## 📝 Notas Importantes

- AZUL cobra comisiones por transacción
- Debes cumplir con PCI DSS para manejar datos de tarjetas
- Las transacciones tienen límites de tiempo para anulación/reembolso
- Mantén tus credenciales seguras y nunca las expongas en código

---

¡Tu integración con AZUL está lista! 🎉