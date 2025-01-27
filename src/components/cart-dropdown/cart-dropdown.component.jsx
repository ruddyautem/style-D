import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";

const CartDropdown = () => {
  const cartProducts = useCartStore.getState().cartProducts;
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const goToCheckoutOrAuth = () => {
    useCartStore.getState().setIsCartOpen(false); // Close the cart
    currentUser ? navigate("/checkout") : navigate("/auth");
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent closing when clicking inside the dropdown
  };

  return (
    <CartDropdownContainer onClick={handleDropdownClick}>
      <CartItems>
        {Array.isArray(cartProducts) && cartProducts.length ? (
          cartProducts.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>VOTRE PANIER EST VIDE!</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckoutOrAuth}>
        {currentUser ? "PAYER VOS ARTICLES" : "SE CONNECTER"}
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
