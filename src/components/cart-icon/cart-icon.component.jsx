import React, { useEffect, useRef } from "react";
import {
  CartIconContainer,
  ProductCount,
  ShoppingIcon,
} from "./cart-icon.styles";
import useCartStore from "../../stores/cartStore";
// import useUserStore from "../../stores/userStore";

const CartIcon = () => {
  // const { currentUser } = useUserStore();
  const { cartCount, isCartOpen, setIsCartOpen } = useCartStore();

  const cartIconRef = useRef(null);

  // useEffect(() => {
  //   if (currentUser) {
  //     useUserStore.getState().setCurrentUser(currentUser);
  //     useCartStore.getState().setUserId(currentUser.uid);
  //   } else {
  //     resetLocalCart();
  //     console.log("Local cart reset triggered");
  //   }
  // }, [currentUser, resetLocalCart]);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isCartOpen &&
        cartIconRef.current &&
        !cartIconRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isCartOpen, setIsCartOpen]);

  return (
    <CartIconContainer ref={cartIconRef} onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ProductCount>{cartCount}</ProductCount>
    </CartIconContainer>
  );
};

export default CartIcon;
