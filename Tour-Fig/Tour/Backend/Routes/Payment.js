import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe("YOUR_KEY"); // use test secret key from Stripe

// Create payment intent (backend)
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents (₹100 = 10000 paisa = 10000)
      currency, // e.g. 'usd' or 'inr'
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
