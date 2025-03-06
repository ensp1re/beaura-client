import { loadStripe } from "@stripe/stripe-js";
import * as dotenv from "dotenv";
dotenv.config();

console.log("Stripe Public Key:", process.env.NEXT_PUBLIC_STRIPE_KEY);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export default stripePromise;
