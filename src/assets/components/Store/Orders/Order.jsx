import React, { useState, useEffect, useContext } from 'react';
import './products.css';
import { DbContext } from '../../../Contexts';

const Order = ({ id, order }) => {
    const [order, setOrder] = useState(order);
    var db = useContext(DbContext);

    useEffect(() => {
        const loadOrder = async () => {
            if (!order) {
                var order = await db.getOrder(id);
                setOrder(order);
            }
        }
        loadOrder();
    }, [order]);

    return (
        order ?
        <div className='order'>
        </div>
        : <></>
    );
};

export default Order;
