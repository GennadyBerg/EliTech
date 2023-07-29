import React from 'react';
import MainLayout from './MainLayot/MainLayut.jsx';
import StoreList from './StoreList/StoreList.jsx';
import Products from './Products/Products.jsx';

function distinct(arr, propName) {
    const uniqueObject = {};
    arr.forEach(item => uniqueObject[JSON.stringify(item[propName])] = item);
    return Object.values(uniqueObject);
}
function single(arr, propName, orDefault = false) {
    let uniqueItems = distinct(arr, propName);
    if (uniqueItems.length === 1) {
        return uniqueItems[0];
    } else if (uniqueItems.length === 0) {
        if (!orDefault)
            throw new Error('Sequence contains no matching element.');
        else
            return undefined;
    } else {
        throw new Error('Sequence contains more than one matching element.');
    }
}

const Store = ({ stores, setStoreId, storeId, addToCart, cartItems }) => {
    let selectedStoreItem = single(cartItems, "storeId", true)
    return (
        <div className="store">
            <MainLayout>
                <div style={{ width: '20%' }}>
                    <StoreList stores={stores} setStoreId={setStoreId} enabledStoreId={selectedStoreItem?.storeId} />
                </div>
                <div style={{ width: '80%' }}>{storeId ? <Products storeId={storeId} addToCart={addToCart} /> : ''}</div>
            </MainLayout>
        </div>
    );
};

export default Store;
