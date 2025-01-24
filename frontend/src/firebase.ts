// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBg6aIVEocLBflZvNYk0omCS04moCknnTw",
  authDomain: "pintres-project.firebaseapp.com",
  projectId: "pintres-project",
  storageBucket: "pintres-project.appspot.com",
  messagingSenderId: "1019736564439",
  appId: "1:1019736564439:web:e9ed3d49eeb43fd7984692",
  measurementId: "G-TL63CQW6P4"
};

//  Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);