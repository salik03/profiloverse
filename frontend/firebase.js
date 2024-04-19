// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw2AqDmI_mKVya9DcoaHitCk98se9yyOQ",
  authDomain: "profiloverse.firebaseapp.com",
  projectId: "profiloverse",
  storageBucket: "profiloverse.appspot.com",
  messagingSenderId: "168589326846",
  appId: "1:168589326846:web:30ea5609342514179668af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);