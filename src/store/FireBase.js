// Import the functions you need from the SDKs you need
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU9513I_SxTaMIGGzIaC-yqtDZJOEJ0Ds",
  authDomain: "yody-shop.firebaseapp.com",
  projectId: "yody-shop",
  storageBucket: "yody-shop.appspot.com",
  messagingSenderId: "970567070417",
  appId: "1:970567070417:web:bc0b4bdda8a0573c250bf0",
  measurementId: "G-VL07B103RB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}