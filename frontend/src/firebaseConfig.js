// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2ZZJUqCgqcVMvVzTS0TKK2CE748zcscU",
  authDomain: "frontendinternship-77780.firebaseapp.com",
  projectId: "frontendinternship-77780",
  storageBucket: "frontendinternship-77780.firebasestorage.app",
  messagingSenderId: "807753493951",
  appId: "1:807753493951:web:1026c683629e1d59d7c50a",
  measurementId: "G-3E9957G9CP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { auth, db };
