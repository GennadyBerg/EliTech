
import { NavLink } from "react-router-dom";
import './header.css'

const Header = ({ cartItems }) => {
    let test = !(cartItems?.length > 0);
    return (
        <div className='header'>
            <div className="header__container">
                <div className="header__navbar">
                    <ul className="navbar__list">
                        <li className='navbar__item _border'>
                            <NavLink to='/'>Shop</NavLink>
                        </li>
                        <li className='navbar__item _border'>
                            {
                                cartItems?.length > 0 ?
                                    <NavLink to='/cart'>Shopping Cart</NavLink> :
                                    <div>Shopping Cart</div>
                            }
                        </li>
                        <li className='navbar__item '>
                            <NavLink to='/orders'>History</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;