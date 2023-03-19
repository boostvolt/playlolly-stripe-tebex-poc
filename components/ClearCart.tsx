import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

export const ClearCart = () => {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return <p>Cart cleared.</p>;
};
