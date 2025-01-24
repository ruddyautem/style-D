import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";
import useCartStore from "../../stores/cartStore";

const CartDropdown = () => {
  const cartProducts = useCartStore((state) => state.getCartProducts());
  console.log('Current cart items:', cartProducts);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {Array.isArray(cartProducts) && cartProducts.length ? (
          cartProducts.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        ) : (
          <EmptyMessage>VOTRE PANIER EST VIDE!</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>PAYER VOS ARTICLES</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;