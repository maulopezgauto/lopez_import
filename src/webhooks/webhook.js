import express from "express"
import bodyParser from "body-parser"
import { stripe } from "../config/stripe/stripe.js"
import { supabase } from "../config/services/supabase.js"
import { v4 as uuidv4 } from "uuid"

const router = express.Router()

router.post(
  "/stripe",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"]

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object
        const usuario_id = paymentIntent.metadata.usuario_id
        const carritoJson = paymentIntent.metadata.carrito_items
        const total = parseFloat(paymentIntent.metadata.total)
        const monto_pagado = paymentIntent.amount / 100 // convertir de centavos a pesos

        // Parsear items del carrito desde metadata
        let carrito_items = []
        try {
          carrito_items = JSON.parse(carritoJson)
        } catch (e) {
          console.error(" No se pudo parsear carrito_items:", e)
        }

        // 🧾 Crear pedido en DB (ahora SÍ, después de confirmar pago)
        const pedido_id = uuidv4()

        // Obtener IDs de estados
        const { data: estadoPedido } = await supabase
          .from('estados_pedido')
          .select('id')
          .eq('nombre', 'procesando')
          .single()

        const { data: estadoPago } = await supabase
          .from('estados_pago')
          .select('id')
          .eq('nombre', 'paid')
          .single()

        const { error: pedidoError } = await supabase
          .from("pedidos")
          .insert({
            id: pedido_id,
            usuario_id,
            total,
            items: carrito_items,
            estado_id: estadoPedido?.id || 2, // Default a 'procesando'
            payment_status_id: estadoPago?.id || 2, // Default a 'paid'
            provider: "stripe"
          })

        if (pedidoError) {
          console.error("❌ Error creando pedido:", pedidoError)
          throw pedidoError
        }

        // 💳 Crear registro de pago en DB
        const { error: paymentError } = await supabase
          .from("pagos")
          .insert({
            id: uuidv4(),
            pedido_id,
            usuario_id,
            proveedor: "stripe",
            referencia_proveedor: paymentIntent.id,
            monto: total,
            moneda: "DOP",
            estado_id: estadoPago?.id || 2 // Default a 'paid'
          })

        if (paymentError) {
          console.error("❌ Error creando pago:", paymentError)
          throw paymentError
        }

        // 💰 Actualizar total_gastado del usuario
        const { data: usuario, error: getUserError } = await supabase
          .from("usuarios")
          .select("total_gastado")
          .eq("id", usuario_id)
          .single()

        if (getUserError && getUserError.code !== "PGRST116") {
          console.error("⚠️ Error fetchin user:", getUserError)
        } else {
          const totalActual = usuario?.total_gastado || 0
          const nuevoTotal = totalActual + monto_pagado

          const { error: updateUserError } = await supabase
            .from("usuarios")
            .update({ total_gastado: nuevoTotal })
            .eq("id", usuario_id)

          if (updateUserError) {
            console.error("⚠️ Error updating total_gastado:", updateUserError)
          } 
        }
      }

      //  Manejar pagos fallidos/cancelados
      if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object
        const usuario_id = paymentIntent.metadata.usuario_id

        // Aquí el pedido NO se crea, porque el pago falló
      }

      res.json({ received: true })
    } catch (err) {
      console.error("❌ Webhook error:", err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
    }
  }
)

export default router