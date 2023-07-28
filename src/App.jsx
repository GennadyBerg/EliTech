// App.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './assets/components/Cart/Cart.jsx';
import Header from './assets/components/Header/Header.jsx';
import useLocalStorageInit from './assets/components/Store/useLocalStorageInit';
import Store from "./assets/components/Store/Store.jsx";
import { DbContext } from './assets/Contexts.js';

function App() {
    const [storeId, setStoreId] = useState(null);
    const [cartItems, setCartItems] = useLocalStorageInit('cartItems', []);

    const db = useContext(DbContext);
    useEffect(() => {
        const loadData = async () => {
            db.fillData();
        }
        loadData();
    }, []);

    const addToCart = (storeId, productId, productData) => {
        const existingItem = cartItems.find(
            (item) => item.storeId === storeId && item.productId === productId
        );

        if (existingItem) {
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.storeId === storeId && item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems((prevCartItems) => [
                ...prevCartItems,
                { storeId: storeId, productId: productId, quantity: 1, ...productData },
            ]);
        }
    };

    return (
        <Router>
            <div className="_container">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Store
                                storeId={storeId}
                                setStoreId={setStoreId}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                addToCart={addToCart}
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart cartItems={cartItems} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
