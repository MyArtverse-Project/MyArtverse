import checkoutNodeJssdk from "@paypal/checkout-server-sdk"
import { isProduction, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "./env"

const configureEnvironment = () => {
  return isProduction
    ? new checkoutNodeJssdk.core.LiveEnvironment(
        PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET
      )
    : new checkoutNodeJssdk.core.SandboxEnvironment(
        PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET
      )
}

const getPaypal = () => {
  if (!PAYPAL_CLIENT_ID) {
    console.error("PayPal client ID not specified on the .env file")
    return
  }

  if (!PAYPAL_CLIENT_SECRET) {
    console.error("PayPal secret ID not specified on the .env file")
    return
  }

  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment())
}

export default getPaypal
