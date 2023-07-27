import './storeList.css'

const StoreList = ({stores, setStoreId}) => {
    return (
        <div className='storeList'>
            <div className='storeList__container'>
                <h1 className='storeList__title'>Выбор магазина</h1>
                <ul className="storeList__list">
                    {stores.map((store) => (
                        <li className='list__item' key={store.id}>
                            <button className="list__btn" onClick={() => setStoreId(store.id)}>{store.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
        ;
};

export default StoreList;
