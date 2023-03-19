import React, { FC, ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";
import * as config from "../config";

export interface CartProps {
  children: ReactNode;
}

export const Cart: FC<CartProps> = ({ children }) => (
  <CartProvider
    cartMode="checkout-session"
    stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
    currency={config.CURRENCY}
  >
    <>{children}</>
  </CartProvider>
);
