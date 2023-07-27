// App.jsx
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './assets/components/Cart/Cart.jsx';
import Header from './assets/components/Header/Header.jsx';
import useLocalStorageInit from './assets/components/Store/useLocalStorageInit';
import product1 from './assets/img/chocolate-1640x790-4-1536x740.jpg';
import product2 from './assets/img/fruit-riot-945x560-yellow.jpg';
import product3 from './assets/img/roshen-cake-945x560-5.jpg';
import Store from "./assets/components/Store/Store.jsx";

function App() {
    const [stores, setStores] = useState([]);
    const [storeId, setStoreId] = useState(null);

    const getCartItemsFromLocalStorage = () => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return storedCartItems;
    };

    const cartItemsFromLocalStorage = getCartItemsFromLocalStorage();
    const [cartItems, setCartItems] = useLocalStorageInit('cartItems', cartItemsFromLocalStorage);

    useEffect(() => {
        const sampleStores = [
            { id: 1, name: 'Магазин 1' },
            { id: 2, name: 'Магазин 2' },
            { id: 3, name: 'Магазин 3' },
        ];
        setStores(sampleStores);

        const sampleProducts = [
            { id: 1, name: 'Товар 1', img: product1, price: 100 },
            { id: 2, name: 'Товар 2', img: product2, price: 200 },
            { id: 3, name: 'Товар 3', img: product3, price: 300 },
        ];

        sampleStores.forEach((store) => {
            localStorage.setItem(`products_${store.id}`, JSON.stringify(sampleProducts));
        });
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
                                stores={stores}
                                setStores={setStores}
                                storeId={storeId}
                                setStoreId={setStoreId}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                addToCart={addToCart}
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
