import React, {useContext, useState} from 'react';
import './cart.css';
import Map from "../Map/Map.jsx";
import { DbContext } from '../../Contexts';

const Cart = ({cartItems, setCartItems}) => {
    const [quantities, setQuantities] = useState({});
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isMessageInputFocused, setMessageInputFocused] = useState(false);
    const db = useContext(DbContext);

    const handleFocusMessageInput = () => {
        setMessageInputFocused(true);
    };

    const handleBlurMessageInput = () => {
        setMessageInputFocused(false);
    };
    const isValidEmail = (email) => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^\+380\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const errors = {};

        /*if (firstName.trim() === '') {
            errors.firstName = 'Будь ласка, напишіть ваше ім`я.';
        }

        if (address.trim() === '') {
            errors.address = 'Будь ласка, напишіть ваше адрес.';
        }

        if (!isValidEmail(email)) {
            errors.email = 'Будь ласка напишіть ваш Email.';
        }

        if (!isValidPhoneNumber(phone)) {
            errors.phone = 'Будь ласка напишіть ваш номер телефону';
        }*/

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            const order =                 
            {
                creationDate: new Date(),
                orderedProducts: cartItemsInCart.map(citm => ({productId: citm.productId, name: citm.name, price: citm.price, quantity: citm.quantity, storeId: citm.storeId})),
                firstName,
                address,
                email,
                phone,
                formErrors,
            }
            db.addOrder(order);
            // Form submission logic here
            alert('Form submitted successfully!');
        }
    };

    const handlePhoneFocus = () => {
        if (!phone) {
            setPhone('+380');
        }
    };


    const handlePhoneInput = (event) => {
        let phoneNumber = event.target.value.replace(/[^\d]/g, '');

        if (phoneNumber.startsWith('380')) {
            phoneNumber = '+380' + phoneNumber.slice(3);
        } else if (!phoneNumber.startsWith('+380')) {
            phoneNumber = '+380' + phoneNumber;
        }

        phoneNumber = phoneNumber.slice(0, 13);

        setPhone(phoneNumber);
    };

    const handleAddressInput = (event) => {
        setAddress(event.target.value)
    };

    const handleQuantityChange = (productId, event) => {
        const value = event.target.value;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));

        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.productId === productId
                    ? {...item, quantity: parseInt(value)}
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
        <form className="cart" onSubmit={handleFormSubmit}>
            <div className="cart__container">
                <div className="cart__form">
                    <div className="cart__map">
                        <Map setAddress={setAddress} address={address} />
                    </div>
                    <div className="cart__inputs">
                        <div className="cart__input">
                            <label htmlFor="input1">Address:</label>
                            <input type="text" id="last-name" className="input-cart" value={address}
                                   onChange={handleAddressInput}/>
                            {formErrors.address && <p className="error">{formErrors.address}</p>}
                        </div>
                        <div className="cart__input">
                            <label htmlFor="input2">Email:</label>
                            <input type="email" id="email" className="input-cart" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            {formErrors.email && <p className="error">{formErrors.email}</p>}
                        </div>
                        <div className="cart__input">
                            <label htmlFor="input3">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                className="input-cart"
                                value={phone}
                                onFocus={handlePhoneFocus}
                                onChange={handlePhoneInput}
                                placeholder="+380"
                            />
                            {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                        </div>
                        <div className="cart__input">
                            <label htmlFor="input4">Name:</label>
                            <input type="text" id="first-name" className="input-cart" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                            {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
                        </div>
                    </div>
                </div>
                <div className="orderList__main">
                    <div className="cart__orderList">
                        <div className="orderList__root">
                            <div className="orderList__container">
                                {cartItemsInCart.map((item) => (
                                    <div key={`${item.storeId}-${item.productId}`} className="orderList__item">
                                        <div className="orderList__image">
                                            <img src={item.img} alt="" className="orderList__img"/>
                                        </div>
                                        <div className="orderList__content">
                                            <div className="orderList__title">{item.name}</div>
                                            <div className="orderList__price">{item.price} uah.</div>
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
                                                <button onClick={() => handleRemoveItem(item.productId)}>Удалить
                                                </button>
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
                                    <div className="orderList_sum">Total sum: {calculateTotalSum()} uah.</div>
                                    <div className="orderList__button">
                                        <button type="submit" className="button__submit">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Cart;
