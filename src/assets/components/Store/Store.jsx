import React from 'react';
import MainLayout from './MainLayot/MainLayut.jsx';
import StoreList from './StoreList/StoreList.jsx';
import Products from './Products/Products.jsx';

const Store = ({ stores, setStoreId, storeId, addToCart }) => {
    return (
        <div className="store">
            <MainLayout>
                <div style={{ width: '20%' }}>
                    <StoreList stores={stores} setStoreId={setStoreId} />
                </div>
                <div style={{ width: '80%' }}>{storeId ? <Products storeId={storeId} addToCart={addToCart} /> : ''}</div>
            </MainLayout>
        </div>
    );
};

export default Store;
