import React, { useEffect, useRef } from "react";
import { CartIconContainer, ProductCount, ShoppingIcon } from "./cart-icon.styles";
import useCartStore from "../../stores/cartStore";

const CartIcon = () => {
  const { isCartOpen, cartCount, setIsCartOpen } = useCartStore();
  const cartRef = useRef(null);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isCartOpen, setIsCartOpen]);

  return (
    <CartIconContainer ref={cartRef} onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ProductCount>{cartCount}</ProductCount>
    </CartIconContainer>
  );
};

export default CartIcon;
