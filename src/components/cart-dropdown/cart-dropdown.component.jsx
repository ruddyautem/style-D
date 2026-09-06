import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";

import {
  CartBackdrop,
  CartDrawerContainer,
  DrawerHeader,
  ShippingMeter,
  CartItemsList,
  EmptyState,
  DrawerFooter,
} from "./cart-dropdown.styles";

export const CartDrawerView = ({ onClose }) => {
  const cartProducts = useCartStore((state) => state.cartProducts);
  const cartCount = useCartStore((state) => state.cartCount);
  const cartTotal = useCartStore((state) => state.cartTotal);
  
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const goToCheckoutOrAuth = () => {
    onClose();
    currentUser ? navigate("/checkout") : navigate("/auth");
  };

  return (
    <>
      <DrawerHeader>
        <h3>PANIER [ {cartCount} ]</h3>
        <button onClick={onClose}>[ FERMER ]</button>
      </DrawerHeader>

      <ShippingMeter>
        <span>LIVRAISON EXPRESS OFFERTE</span>
      </ShippingMeter>

      <CartItemsList>
        {Array.isArray(cartProducts) && cartProducts.length ? (
          cartProducts.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyState>
            <span className="title">PANIER VIDE</span>
            <span className="desc">
              Découvrez nos dernières collections Homme & Femme pour commencer vos sélections.
            </span>
          </EmptyState>
        )}
      </CartItemsList>

      {cartProducts.length > 0 && (
        <DrawerFooter>
          <div className="subtotal-row">
            <span className="label">SOUS-TOTAL ESTIMÉ</span>
            <span className="amount">{cartTotal} €</span>
          </div>

          <button className="checkout-btn" onClick={goToCheckoutOrAuth}>
            {currentUser
              ? `FINALISER LA COMMANDE • ${cartTotal} € ↗`
              : "SE CONNECTER POUR COMMANDER ↗"}
          </button>

          <span className="note">
            EXPÉDITION 48H • PAIEMENT 100% SÉCURISÉ STRIPE
          </span>
        </DrawerFooter>
      )}
    </>
  );
};

const CartDropdown = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Dark overlay backdrop */}
      <CartBackdrop $isOpen={isCartOpen} onClick={closeCart} />

      {/* Slide-over Drawer */}
      <CartDrawerContainer $isOpen={isCartOpen} onClick={(e) => e.stopPropagation()}>
        <CartDrawerView onClose={closeCart} />
      </CartDrawerContainer>
    </>
  );
};

export default CartDropdown;
