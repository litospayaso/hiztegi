export type StoreName = 'books' | 'chapters' | 'progress' | 'dictionary';

export const DB_NAME = 'hiztegi-db';
export const DB_VERSION = 1;

const STORE_CONFIG: Record<StoreName, { keyPath: string }> = {
  books: { keyPath: 'id' },
  chapters: { keyPath: 'id' },
  progress: { keyPath: 'bookId' },
  dictionary: { keyPath: 'word' },
};

let dbPromise: Promise<IDBDatabase> | null = null;

export const open = (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        (Object.keys(STORE_CONFIG) as StoreName[]).forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, STORE_CONFIG[store]);
          }
        });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
};

export const requestResult = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const transaction = (
  storeNames: StoreName | StoreName[],
  mode: IDBTransactionMode,
  callback: (stores: Record<StoreName, IDBObjectStore>) => void
): Promise<void> => {
  return open().then(
    db =>
      new Promise<void>((resolve, reject) => {
        const names = Array.isArray(storeNames) ? storeNames : [storeNames];
        const tx = db.transaction(names, mode);
        const stores = {} as Record<StoreName, IDBObjectStore>;
        names.forEach(name => {
          stores[name] = tx.objectStore(name);
        });
        try {
          callback(stores);
        } catch (err) {
          tx.abort();
          reject(err);
          return;
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
  );
};

export const getAll = async <T>(store: StoreName): Promise<T[]> => {
  const db = await open();
  return requestResult(db.transaction(store, 'readonly').objectStore(store).getAll() as IDBRequest<T[]>);
};

export const get = async <T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> => {
  const db = await open();
  return requestResult(db.transaction(store, 'readonly').objectStore(store).get(key) as IDBRequest<T>);
};

export const getByIndex = async <T>(
  store: StoreName,
  indexName: string,
  key: IDBValidKey
): Promise<T | undefined> => {
  const db = await open();
  return requestResult(
    db.transaction(store, 'readonly').objectStore(store).index(indexName).get(key) as IDBRequest<T>
  );
};

export const put = async (store: StoreName, value: object): Promise<IDBValidKey> => {
  const db = await open();
  return requestResult(db.transaction(store, 'readwrite').objectStore(store).put(value));
};

export const remove = async (store: StoreName, key: IDBValidKey): Promise<void> => {
  const db = await open();
  return requestResult(db.transaction(store, 'readwrite').objectStore(store).delete(key) as IDBRequest<undefined>);
};

export const clear = async (store: StoreName): Promise<void> => {
  const db = await open();
  return requestResult(db.transaction(store, 'readwrite').objectStore(store).clear() as IDBRequest<undefined>);
};

export const deleteDatabase = async (): Promise<void> => {
  const db = await open();
  db.close();
  dbPromise = null;
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
