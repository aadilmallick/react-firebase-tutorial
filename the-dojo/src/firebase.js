// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-22OMPZSRePLXl_Pjru_9l8YhJwFYOAA",
  authDomain: "project-management-9befc.firebaseapp.com",
  projectId: "project-management-9befc",
  storageBucket: "project-management-9befc.appspot.com",
  messagingSenderId: "603218971903",
  appId: "1:603218971903:web:a248c25e7fdc7e21e010ca",
  measurementId: "G-73LDWMKLMZ",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
