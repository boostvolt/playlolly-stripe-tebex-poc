import { NextApiRequest, NextApiResponse } from "next";

/*
 * Product data can be loaded from anywhere. Currently we’re loading it from
 * a local JSON file, but in the future this should come from an async Tebex API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so we know the pricing information is accurate.
 */
import { validateCartItems } from "use-shopping-cart/utilities";
import inventory from "../../../data/products";

import Stripe from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(inventory as any, req.body);
      const hasSubscription = line_items.find((item) => {
        return !!item.price_data.recurring;
      });
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
        mode: hasSubscription ? "subscription" : "payment",
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";

      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
