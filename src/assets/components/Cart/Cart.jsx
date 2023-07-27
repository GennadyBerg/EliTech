import React, { useState } from 'react';
import './cart.css';

const Cart = ({ cartItems, setCartItems }) => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, event) => {
        const value = event.target.value;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));

        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: parseInt(value) }
                    : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveItem = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.productId !== productId)
        );
    };

    const cartItemsInCart = cartItems.filter((item) => item.quantity > 0);

    const calculateTotalSum = () => {
        let totalSum = 0;
        cartItemsInCart.forEach((item) => {
            totalSum += item.price * item.quantity;
        });
        return totalSum;
    };

    return (
        <div className="cart">
            <div className="cart__container">
                <div className="orderList__container">
                    {cartItemsInCart.map((item) => (
                        <div key={`${item.storeId}-${item.productId}`} className="orderList__item">
                            <div className="orderList__image">
                                <img src={item.img} alt="" className="orderList__img" />
                            </div>
                            <div className="orderList__content">
                                <div className="orderList__title">{item.name}</div>
                                <div className="orderList__price">{item.price} руб.</div>
                                <div className="orderList__count">
                                    <input
                                        className="orderList__input"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={quantities[item.productId] || item.quantity}
                                        onChange={(e) => handleQuantityChange(item.productId, e)}
                                    />
                                </div>
                                <div className="orderList__remove">
                                    <button onClick={() => handleRemoveItem(item.productId)}>Удалить</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="orderList__info">
                    <div className="orderList__captcha">
                        <button className="captcha">captcha</button>
                    </div>
                    <div className="orderList__submit">
                        <div className="orderList_sum">Total sum: {calculateTotalSum()} руб.</div>
                        <div className="orderList__button">
                            <button className="button__submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
