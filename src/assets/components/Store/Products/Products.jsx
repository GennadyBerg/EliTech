import React, { useState, useEffect, useContext } from 'react';
import './products.css';
import { DbContext } from '../../../Contexts';

const Products = ({ storeId, addToCart }) => {
    const [products, setProducts] = useState([]);
    var db = useContext(DbContext);

    useEffect(() => {
        const loadProducts = async () => {
            var products = await db.getProducts(storeId);  
            setProducts(products);
        }
        loadProducts();
    }, [storeId]);

    const handleAddToCart = (productId) => {
        addToCart(storeId, productId, products.find((product) => product.id === productId));
    };

    return (
        <div className='products'>
            <div className="products__container">
                <h2>Список товаров в магазине {storeId}</h2>
                <ul className='products__list'>
                    {products.map((product) => (
                        <li className='products__item' key={product.id}>
                            <div className="products__content">
                                <div className="products__image">
                                    <img src={product.img} alt="" className="products__img" />
                                </div>
                                <div className="products__title"><p>{product.name}</p></div>
                                <div className="products__button">
                                    <button className='products__btn' onClick={() => handleAddToCart(product.id)}>Добавить в корзину</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Products;
