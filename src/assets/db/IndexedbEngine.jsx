import React from 'react';

class IndexedbEngine {
  constructor(settings) {
    const { storeNames = ['records'], dbName = 'my-db' } = settings ?? {};
    this.dbName = dbName;
    this.storeNames = storeNames;
    this.db = null;
  }

  async ensureDB() {
    if (!this.db)
      await this.openDB();
  }
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (const storeName of this.storeNames) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
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

  async getAll(storeName = null) {
    storeName = storeName ?? this.storeNames[0];
    await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const data = event.target.result;
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