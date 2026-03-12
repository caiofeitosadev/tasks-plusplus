import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBghu3zrcXW0qxrpNbXz2QJGDFbHPqaIyw',
  authDomain: 'tasksplusplus-11df3.firebaseapp.com',
  projectId: 'tasksplusplus-11df3',
  storageBucket: 'tasksplusplus-11df3.firebasestorage.app',
  messagingSenderId: '899593345163',
  appId: '1:899593345163:web:59338d94f6dfe353879c8e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
