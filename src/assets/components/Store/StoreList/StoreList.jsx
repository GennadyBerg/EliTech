import { useContext, useEffect, useState } from 'react';
import './storeList.css'
import { DbContext } from '../../../Contexts';

const StoreList = ({ setStoreId, enabledStoreId }) => {
    const [stores, setStores] = useState([]);
    const db = useContext(DbContext);
    useEffect(() => {
        const loadStores = async () => {
            var stores = await db.getStores();
            setStores(stores);
        }
        loadStores();
    }, []);
    return (
        <div className='storeList'>
            <div className='storeList__container'>
                <h1 className='storeList__title'>Выбор магазина</h1>
                <ul className="storeList__list">
                    {
                        stores?.map((store) => {
                            let enabledStore = !enabledStoreId || enabledStoreId === store.id;
                            return (<li className='list__item' key={store.id}>
                                <button className={enabledStore ? "list__btn" : "list__btn_disabled"}  disabled={!enabledStore} onClick={enabledStore ? () => setStoreId(store.id) : undefined}>{store.name}</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
        ;
};

export default StoreList;
