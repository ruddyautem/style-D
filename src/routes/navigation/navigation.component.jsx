import { Fragment,useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from './../../contexts/user.context';
import { CartContext } from './../../contexts/cart.context';


import './navigation.styles.scss'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const { isCartOpen} = useContext(CartContext)

	const signOutHandler = async () => {
		await signOutUser()
	}



	return (
		<>
			<div className='navigation'>
				<Link className="logo-container" to='/'><CrwnLogo className='Logo'/></Link>

				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
{ currentUser ? ( <span className="nav-link" onClick={signOutHandler}> SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>
						SIGNIN
					</Link>)}
					<CartIcon/>
				</div>
				{isCartOpen && <CartDropdown/>}

			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
