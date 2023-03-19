import React, { useState, useEffect, FC } from "react";

import { StripeTestCards } from "../components/StripeTestCards";

import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";

export const CartSummary: FC = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const response = await fetchPostJSON("/api/checkout_sessions", cartDetails);

    if (response.statusCode > 399) {
      console.error(response.message);
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout(response.id);
  };

  return (
    <form onSubmit={handleCheckout}>
      {errorMessage ? (
        <p style={{ color: "red" }}>Error: {errorMessage}</p>
      ) : null}

      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      <StripeTestCards />

      <button
        className="cart-style-background"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Checkout
      </button>
      <button
        className="cart-style-background"
        type="button"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </form>
  );
};
