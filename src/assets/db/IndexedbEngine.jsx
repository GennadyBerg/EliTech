import React from 'react';

class IndexedbEngine {
  constructor(settings) {
    const { storeDefs = [{ name: 'records', indexes: [{}] }], dbName = 'my-db' } = settings ?? {};
    this.dbName = dbName;
    this.storeDefs = storeDefs;
    this.db = null;
  }

  async ensureDB() {
    if (!this.db)
      await this.openDB();
  }
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 17);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (let storeDef of this.storeDefs) {
          if (db.objectStoreNames.contains(storeDef.name))
            db.deleteObjectStore(storeDef.name);
          const store = db.createObjectStore(storeDef.name, { keyPath: 'id', autoIncrement: true });
          if (storeDef.indexes) {
            for (const indexDef of storeDef.indexes) {
              const indexParameters = storeDef.indexParameters ?? { unique: false, multiEntry: false };
              store.createIndex(indexDef.indexName, indexDef.propertyName, indexParameters);
            }
          }
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  closeDB() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async add(data, storeName = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise(async (resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(data);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async getById(id, storeName = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(id);

      request.onsuccess = (event) => {
        const data = event.target.result;
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Data not found'));
        }
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async getAll(storeName = null, filterBy = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      let request = null;
      if (filterBy?.indexName) {
        const index = objectStore.index(filterBy.indexName);
        request = index.getAll(filterBy.value);
      }
      else
        request = objectStore.getAll();

      request.onsuccess = (event) => {
        const data = event.target.result;
        if (filterBy && !filterBy.indexName)
          data = data.filter(d => d[filterBy.propertyName] == filterBy.value);
        resolve(data);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async update(data, storeName = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.put(data);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  async delete(id, storeName = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.delete(id);

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}


export { IndexedbEngine };