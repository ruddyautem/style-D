import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import StyleD from "../../assets/styled.svg?react";
import { signOutUser } from "../../libs/firebase/firebase.utils";
import useUserStore from "../../stores/userStore";
import useCartStore from "../../stores/cartStore";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { isCartOpen } = useCartStore();

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <span>STYLE</span>
          <StyleD />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>Boutique</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>Déconnexion</NavLink>
          ) : (
            <NavLink to='/auth'>Connexion</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;