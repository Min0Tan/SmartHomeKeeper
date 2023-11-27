// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHJTPD0xjj3ktwWngjhXpZT0G8DCC50o",
  authDomain: "smarthomekeeper.firebaseapp.com",
  databaseURL: "https://smarthomekeeper-default-rtdb.firebaseio.com",
  projectId: "smarthomekeeper",
  storageBucket: "smarthomekeeper.appspot.com",
  messagingSenderId: "328868254140",
  appId: "1:328868254140:web:261fe844f196700e8e9bb9",
  measurementId: "G-KE0LZBC221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, getDatabase };