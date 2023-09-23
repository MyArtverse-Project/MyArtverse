import { STRIPE_PUBLISHABLE_KEY } from "./env"
import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export default getStripe
