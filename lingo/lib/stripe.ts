import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-06-20",
    typescript:true,
})