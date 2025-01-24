import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../libs/firebase/firebase.utils";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";
import useUserStore from "../../stores/userStore";
import useCartStore from "../../stores/cartStore";

const Navigation = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { isCartOpen } = useCartStore();

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='Logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>TOUS LES ARTICLES</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              {" "}
              SE DÉCONNECTER
            </NavLink>
          ) : (
            <NavLink to='/auth'>SE CONNECTER</NavLink>
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
