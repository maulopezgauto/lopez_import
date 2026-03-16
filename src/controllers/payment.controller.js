import { stripe } from "../config/stripe/stripe.js"
import { supabase } from "../config/services/supabase.js"
import { v4 as uuidv4 } from "uuid"

export const createPaymentIntent = async (req, res) => {
  try {
    const { carrito, usuario_id, idempotency_key } = req.body

    // 🔐 Validaciones
    if (!usuario_id) {
      return res.status(401).json({ error: "Usuario no autenticado" })
    }

    if (!carrito || !Array.isArray(carrito) || carrito.length === 0) {
      return res.status(400).json({ error: "Carrito vacío" })
    }

    // Calcular total REAL desde backend (seguridad)
    let total = 0
    const invalidItems = []

    carrito.forEach((item, idx) => {
      const precio = Number(item.precio)
      const cantidad = Number(item.cantidad)

      if (!isFinite(precio) || !isFinite(cantidad)) {
        invalidItems.push({ idx, item })
        return
      }

      total += precio * cantidad
    })

    if (invalidItems.length > 0) {
      console.error('Invalid items in carrito', invalidItems)
      return res.status(400).json({ error: 'Producto inválido en carrito', details: invalidItems })
    }

    // Stripe trabaja en centavos
    const amountInCents = Math.round(total * 100)

    if (!isFinite(amountInCents) || isNaN(amountInCents) || amountInCents <= 0) {
      console.error("Invalid total or amountInCents:", { total, amountInCents })
      return res.status(400).json({ error: "Total inválido", total, amountInCents })
    }

    // 💳 Crear PaymentIntent en Stripe con metadata que incluya items del carrito
   
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "dop",
      automatic_payment_methods: { enabled: true },
      metadata: {
        usuario_id,
        carrito_items: carrito.map(i => `${i.id}:${i.cantidad}`).join(','), // Guardar items del carrito
        total: total.toString()
      }
    }, idempotency_key ? { idempotencyKey: idempotency_key } : {})

    // ✅ Respuesta al frontend - SÍ devolver el clientSecret pero NO registrar en BD aún
    res.json({
      clientSecret: paymentIntent.client_secret
    })

  } catch (error) {
    console.error("❌ createPaymentIntent error:", error)
    res.status(500).json({
      error: "Error creando intento de pago",
      details: error.message
    })
  }
}