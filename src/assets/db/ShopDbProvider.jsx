import { DbContext } from "../Contexts";
import React from 'react';
import { IndexedbEngine } from "./IndexedbEngine";
import product1img from '../img/chocolate-1640x790-4-1536x740.jpg';
import product2img from '../img/fruit-riot-945x560-yellow.jpg';
import product3img from '../img/roshen-cake-945x560-5.jpg';

class ShopDbProvider extends React.Component {
  constructor(props) {
    super(props);
    this.db = new IndexedbEngine(
      {
        storeDefs:
          [
            { name: 'stores' },
            { name: 'products', indexes: [{ indexName: "idxStoreIds", propertyName: "storeId" }] },
            {
              name: 'orders',
              indexes:
                [
                  { indexName: "idxUserId", propertyName: "userId" },
                  { indexName: "idxEmail", propertyName: "email" },
                  { indexName: "idxPhone", propertyName: "phone" },
                ]
            },

          ],
        dbName: 'shopDb',
        version: 19
      });
  }

  async fillDatabaseWithData() {
    const stores = [
      { id: 1, name: 'McDonalds' },
      { id: 2, name: 'KFC' },
      { id: 3, name: 'Adidas' },
    ];

    await this.updateEnities(stores, 'stores');

    const products = [
      { id: 1, name: 'Товар 1.1', img: product1img, storeId: 1, price: 99 },
      { id: 2, name: 'Товар 1.2', img: product2img, storeId: 1, price: 98 },
      { id: 3, name: 'Товар 1.3', img: product3img, storeId: 1, price: 97 },
      { id: 4, name: 'Товар 2.1', img: product1img, storeId: 2, price: 96 },
      { id: 5, name: 'Товар 2.2', img: product2img, storeId: 2, price: 95 },
      { id: 6, name: 'Товар 2.3', img: product3img, storeId: 2, price: 94 },
      { id: 7, name: 'Товар 3.1', img: product1img, storeId: 3, price: 93 },
      { id: 8, name: 'Товар 3.2', img: product2img, storeId: 3, price: 92 },
      { id: 9, name: 'Товар 3.3', img: product3img, storeId: 3, price: 91 },
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
    this.db.delete(productId, 'products');
  }

  async addOrder(order) {
    this.db.add(order, 'orders');
  }

  async updateOrder(order) {
    this.db.update(order, 'orders');
  }

  async deleteOrder(id) {
    this.db.delete(id, 'orders');
  }

  async getProducts(storeId) {
    let res = await this.db.getAll('products', storeId ? { indexName: 'idxStoreIds', value: storeId } : undefined);
    return res;
  }

  async getProductById(id) {
    let res = await this.db.getById(id, 'products');
    return res;
  }

  async getOrders(userId = null, email = null, phone = null) {
    let index = undefined;
    let filterValues = null;
    if (userId) {
      index = { indexName: "idxUserId", value: userId };
      filterValues = { email, phone };
    }
    else if (email) {
      index = { indexName: "idxEmail", value: email };
      filterValues = { userId, phone };
    }
    else if (phone) {
      index = { indexName: "idxPhone", value: phone };
      filterValues = { userId, email };
    }

    let res = await this.db.getAll('orders', index);
    if (filterValues && res.length > 0) {
      let filterEntries = Object.entries(filterValues);
      filterEntries = filterEntries.filter(e => e[1]);
      if (filterEntries.length > 0)
        res = res.filter(r => filterEntries.every(fe => r[fe[0]] == fe[1]));
    }
    return res;
  }

  async getOrderById(id) {
    let res = await this.db.getById(id, 'orders');
    return res;
  }

  async getStores() {
    let res = await this.db.getAll('stores');
    return res;
  }


  render() {
    return (
      <DbContext.Provider
        value={{
          getProducts: this.getProducts.bind(this),
          getStores: this.getStores.bind(this),
          fillData: this.fillDatabaseWithData.bind(this),
          getOrders: this.getOrders.bind(this),
          addOrder: this.addOrder.bind(this),
          deleteOrder: this.deleteOrder.bind(this),
        }}
      >
        {this.props.children}
      </DbContext.Provider>
    );
  }
}


export { ShopDbProvider };