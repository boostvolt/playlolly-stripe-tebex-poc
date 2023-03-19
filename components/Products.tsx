import { FC } from "react";

import products from "../data/products";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export const Products: FC = () => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />

          <h2>{product.name}</h2>

          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>

          <button
            className="cart-style-background"
            onClick={() => {
              console.log(product);
              addItem(product);
            }}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(product.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};
