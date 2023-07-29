import React, { useState, useEffect, useContext } from 'react';
import './ordersList.css';
import { DbContext } from '../../../Contexts';

const OrdersList = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [currEmail, serCurrEmail] = useState();
    const [currPhone, setCurrPhone] = useState();

    var db = useContext(DbContext);

    useEffect(() => {
        const loadOrders = async () => {
            var orders = await db.getOrders(userId, email, phone);
            setOrders(orders);
        }
        loadOrders();
    }, [userId, email, phone]);

    const handleOrderDelete = async (orderId) => {
        await db.deleteOrder(orderId);
        setOrders(prevOrders => prevOrders.filter(item => item.id !== orderId));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setEmail(currEmail);
        setPhone(currPhone);
    }

    const handleEmailInput = (event) => {
        event.preventDefault();
        serCurrEmail(event.target.value)
    };
    const handlePhoneInput = (event) => {
        event.preventDefault();
        setCurrPhone(event.target.value)
    };

    return (
        <>
            <div className="orderList-container">
                <div className="wrap-search-input">
                    <form action="" onSubmit={handleFormSubmit}>
                        <label htmlFor="input1">Email:</label>
                        <input type="email" id="email-search" onChange={handleEmailInput} aria-label="mail" />
                        <label htmlFor="input2">Phone:</label>
                        <input type="tel" id="phone-search" onChange={handlePhoneInput} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="wrap-orders">
                    {
                        orders?.map(order =>
                            <div className="order-wrapper">
                                <div className="wrap-orderItems">
                                    {
                                        order.orderedProducts.map(orderProd =>
                                            orderProd && <div className="card">
                                                <img className="poduct-img" src={orderProd.img} alt="product"
                                                    width="60%" height="100%" />
                                                <div className="prod-price">
                                                    <h5>{orderProd.name}</h5>
                                                    <h5>{orderProd.price}</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="title-order">
                                    <h3>order#: {order.id}</h3>
                                    <h6>{order.phone}</h6>
                                    <h6>{order.firstName}</h6>
                                    <h6>{order.email}</h6>
                                    <h6>{order.address}</h6>
                                    <h4>Total: {order.totalSum}</h4>
                                    <button type='text' onClick={e => handleOrderDelete(order.id)}>Delete</button>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );

};

export default OrdersList;
