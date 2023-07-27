
import {NavLink} from "react-router-dom";
import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header__container">
                <div className="header__navbar">
                    <ul className="navbar__list">
                        <li className='navbar__item _border'>
                            <NavLink to='/'>Store</NavLink>
                        </li>
                        <li className='navbar__item'>
                            <NavLink to='/cart'>Cart</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;