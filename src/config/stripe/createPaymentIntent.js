// createPaymentIntent.js
import { stripe } from './stripe.js';

export default async function createPaymentIntent(req, res) {
  const { amount, order_id } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // centavos
    currency: 'dop', // o usd en test
    metadata: {
      order_id
    }
  });

  res.json({
    clientSecret: paymentIntent.client_secret
  });
}