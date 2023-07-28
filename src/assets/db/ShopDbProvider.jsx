import { DbContext } from "../Contexts";
import React from 'react';
import { IdxdbProvider } from "./IdxdbProvider";
import product1img from '../img/chocolate-1640x790-4-1536x740.jpg';
import product2img from '../img/fruit-riot-945x560-yellow.jpg';
import product3img from '../img/roshen-cake-945x560-5.jpg';

class ShopDbProvider extends React.Component {
  constructor(props) {
    super(props);
    this.db = new IdxdbProvider({ storeNames: ['stores', 'products'], dbName: 'shopDb' });
  }

  async fillDatabaseWithData() {
    const stores = [
      { id: 1, name: 'Магазин 1' },
      { id: 2, name: 'Магазин 2' },
      { id: 3, name: 'Магазин 3' },
    ];

    await this.updateEnities(stores, 'stores');

    const products = [
      { id: 1, name: 'Товар 1.1', img: product1img, storeId: 1 },
      { id: 2, name: 'Товар 1.2', img: product2img, storeId: 1 },
      { id: 3, name: 'Товар 1.3', img: product3img, storeId: 1 },
      { id: 4, name: 'Товар 2.1', img: product1img, storeId: 2 },
      { id: 5, name: 'Товар 2.2', img: product2img, storeId: 2 },
      { id: 6, name: 'Товар 2.3', img: product3img, storeId: 2 },
      { id: 7, name: 'Товар 3.1', img: product1img, storeId: 3 },
      { id: 8, name: 'Товар 3.2', img: product2img, storeId: 3 },
      { id: 9, name: 'Товар 3.3', img: product3img, storeId: 3 },
    ];

    await this.updateEnities(products, 'products');
  }

  async updateEnities(entities, entitiesType) {
    const entitiesInDbReq = await this.db.getAll(entitiesType);
    const entitiesInDb = new Set(entitiesInDbReq.map(e => e.id));
    for (const entity of entities) {
      if (entitiesInDb.has(entity.id))
        await this.db.update(entity, entitiesType)
      else
        await this.db.add(entity, entitiesType);
      entitiesInDb.delete(entity.id);
    }
    for (const entityId of entitiesInDb) {
      await this.db.delete(entityId, entitiesType);
    }
  }

  async addStore(store) {
    this.db.add(store, 'stores');
  }

  async addProduct(product) {
    this.db.add(product, 'products');
  }

  async updateProduct(product) {
    this.db.update(product, 'products');
  }

  async deleteProduct(productId) {
    this.db.deleteProduct(productId, 'products');
  }

  async getProducts(storeId) {
    let res = await this.db.getAll('products');
    if (storeId)
      res = res.filter(p => p.storeId == storeId);
    return res;
  }

  async getStores(storeId) {
    let res = await this.db.getAll('stores');
    if (storeId)
      res = res.filter(p => p.sttoreId == storeId);
    return res;
  }

  async getById(id) {
    let res = getProducts().find(p => p.id == id)
    return res;
  }

  render() {
    return (
      <DbContext.Provider
        value={{
          getProducts: this.getProducts.bind(this),
          getStores: this.getStores.bind(this),
          getById: this.getById.bind(this),
          fillData: this.fillDatabaseWithData.bind(this),
        }}
      >
        {this.props.children}
      </DbContext.Provider>
    );
  }
}


export { ShopDbProvider };