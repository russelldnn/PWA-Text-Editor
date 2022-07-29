import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//variable path to connect to the database, make a new transaction, open the object store then finally pass in whatever content is being saved
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const tx = db.transaction('jate', 'readwrite');
  const oStore = tx.objectStore('jate');
  const dataReq = oStore.put({jate: content});
  const data = await dataReq;
  console.log("Data added to database", data);
  
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const oStore = tx.objectStore('jate');
  const dataReq = oStore.getAll();
  const data = await dataReq;
  console.log('Data retrieved', data);

};

initdb();
