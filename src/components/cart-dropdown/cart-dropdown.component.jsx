import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";
import { useTranslation } from "../../stores/languageStore";

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
  const { t } = useTranslation();
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
        <h3>{t("cart.title")} [ {cartCount} ]</h3>
        <button onClick={onClose}>[ {t("nav.close")} ]</button>
      </DrawerHeader>

      <ShippingMeter>
        <span>{t("checkout.freeShippingWorldwide")}</span>
      </ShippingMeter>

      <CartItemsList>
        {Array.isArray(cartProducts) && cartProducts.length ? (
          cartProducts.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyState>
            <span className='title'>{t("cart.emptyTitle")}</span>
            <span className='desc'>
              {t("cart.emptyDesc")}
            </span>
          </EmptyState>
        )}
      </CartItemsList>

      {cartProducts.length > 0 && (
        <DrawerFooter>
          <div className='subtotal-row'>
            <span className='label'>{t("cart.estimatedSubtotal")}</span>
            <span className='amount'>{cartTotal} €</span>
          </div>

          <button className='checkout-btn' onClick={goToCheckoutOrAuth}>
            {currentUser
              ? t("cart.checkoutBtn")
              : t("cart.loginToOrderBtn")}
          </button>

          <span className='note'>
            {t("cart.shippingNote")}
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
      <CartDrawerContainer
        $isOpen={isCartOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <CartDrawerView onClose={closeCart} />
      </CartDrawerContainer>
    </>
  );
};

export default CartDropdown;
