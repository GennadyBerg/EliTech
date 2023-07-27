import React from 'react';

const ShoppingCart = ({ cartItems }) => {
    return (
        <div>
            <h2>Корзина покупок</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        Магазин {item.storeId}, Товар {item.productId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;
