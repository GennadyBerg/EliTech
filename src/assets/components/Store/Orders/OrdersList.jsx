import React, { useState, useEffect, useContext } from 'react';
import './ordersList.css';
import { DbContext } from '../../../Contexts';

const OrdersList = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    var db = useContext(DbContext);
    const handleOrderDelete = async (orderId) => {
        await db.deleteOrder(orderId);
        var newOrders = orders.filter(item => item.id !== orderId);
        setOrders(newOrders);
    }

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
