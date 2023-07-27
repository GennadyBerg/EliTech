// Cart.jsx
import React, {useState} from 'react';
import './cart.css';

const Cart = ({cartItems}) => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, event) => {
        const value = event.target.value;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));
    };

    return (
        <div className='cart'>
            <div className="cart__container">
                <div className="cart__form">
                    <div className="cart__map">
                    </div>
                    <form className="cart__inputs">
                        <div className="cart__input">
                            <input className='input-cart' type="text"/>
                        </div>
                        <div className="cart__input">
                            <input className='input-cart' type="text"/>
                        </div>
                        <div className="cart__input">
                            <input className='input-cart' type="text"/>
                        </div>
                        <div className="cart__input">
                            <input className='input-cart' type="text"/>
                        </div>
                    </form>
                </div>
                <div className="cart__orderList">
                    <div className="orderList__root">
                        <div className="orderList__container">
                            {cartItems.map((item) => (
                                <div key={`${item.storeId}-${item.productId}`} className="orderList__item">
                                    <div className="orderList__image">
                                        {/* Replace 'item.img' with the actual image path */}
                                        <img src={item.img} alt="" className="orderList__img"/>
                                    </div>
                                    <div className="orderList__content">
                                        {/* Replace 'item.name' with the actual product name */}
                                        <div className="orderList__title">{item.name}</div>
                                        <div className="orderList__price">99999</div>
                                        <div className="orderList__count">
                                            <input
                                                className="orderList__input"
                                                type="number"
                                                min="1"
                                                max="10"
                                                defaultValue={quantities[item.productId] || 1}
                                                onChange={(e) => handleQuantityChange(item.productId, e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="orderList__info">
                            <div className="orderList__captcha">
                                <button className='captcha'>captcha</button>
                            </div>
                            <div className="orderList__submit">
                                <div className="orderList_sum">
                                    Total sum : 9999
                                </div>
                                <div className="orderList__button">
                                    <button className="button__submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
