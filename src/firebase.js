import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBh_taU2dn-IChrVL87d4ws9iMv3UbQkYo',
  authDomain: 'realtime-chat-27999.firebaseapp.com',
  projectId: 'realtime-chat-27999',
  storageBucket: 'realtime-chat-27999.appspot.com',
  messagingSenderId: '815928546794',
  appId: '1:815928546794:web:47e190165b3157c211ce93',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
