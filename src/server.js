import express from "express"
import cors from "cors"
import "dotenv/config" // load .env from project root
import webhookRoutes from "./webhooks/webhook.js"
import { createPaymentIntent } from "./controllers/payment.controller.js"

const app = express()

app.use(cors())

// ⚠️ webhook antes de json()
app.use("/webhook", webhookRoutes)

// resto del backend
app.use(express.json())

//Rutas para crear pagos
app.post("/api/payments/create-intent", createPaymentIntent)


app.listen(4000, () => {
  console.log("Backend running on port 4000")
})