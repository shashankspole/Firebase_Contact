// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz4W_4nOpiykrXqdlQX5ChE_sxiMzBVHw",
  authDomain: "fir-contact-39f7f.firebaseapp.com",
  projectId: "fir-contact-39f7f",
  storageBucket: "fir-contact-39f7f.appspot.com",
  messagingSenderId: "255866458121",
  appId: "1:255866458121:web:f5fdf97ce29ac7eef9a8d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)