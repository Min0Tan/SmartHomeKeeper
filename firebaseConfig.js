// Import the functions you need from the SDKs I need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHJTPD0xjj3ktwWngjhXpZT0G8DCC50o",    //Firebase API 키
  authDomain: "smarthomekeeper.firebaseapp.com",    //Firebase 인증 도메인
  databaseURL: "https://smarthomekeeper-default-rtdb.firebaseio.com",    //Firebase Database URL
  projectId: "smarthomekeeper",    //Firebase Project ID
  storageBucket: "smarthomekeeper.appspot.com",    //Firebase Storage Bucket
  messagingSenderId: "328868254140",    //Firebase Messaging Sender ID
  appId: "1:328868254140:web:261fe844f196700e8e9bb9",    //Firebase App ID
  measurementId: "G-KE0LZBC221"    //Google Analytics Measurement ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);    //initializeApp 함수를 통해 Firebase 앱 인스턴스를 생성하고 변수 app에 할당
const db = getDatabase(app);    //getDatabase 함수를 통해 Firebase Realtime Database 인스턴스를 가져오고 변수 db에 할당

export { db, getDatabase };    //db와 getDatabase를 export하여, 이 파일을 import하는 다른 파일에서 사용가능하도록 하기
