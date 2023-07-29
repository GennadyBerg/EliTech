import React, { useState, useEffect, useContext } from 'react';
import './ordersList.css';
import { DbContext } from '../../../Contexts';

const OrdersList = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    var db = useContext(DbContext);

    useEffect(() => {
        const loadOrders = async () => {
            var orders = await db.getOrders(userId);
            setOrders(orders);
        }
        loadOrders();
    }, [userId]);

    return (
        <>
            <div className="orderList-container">
                <div className="wrap-search-input">
                    <form action="">
                        <label htmlFor="input1">Email:</label>
                        <input type="email" id="email-search" aria-label="mail" />
                        <label htmlFor="input2">Phone:</label>
                        <input type="tel" id="phone-search" />
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
                                                <img className="poduct-img" src="/src/assets/img/smk-calendar-470x560-10.jpg" alt="product"
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
                                    <h4>Total: {order.total}</h4>
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