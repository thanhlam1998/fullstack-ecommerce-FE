// Import the functions you need from the SDKs you need
import firebase from "firebase"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBroXCynL2m6LUH7KHpL3Xr8sOLMXtNmaw",
  authDomain: "ecommerce-384cb.firebaseapp.com",
  projectId: "ecommerce-384cb",
  storageBucket: "ecommerce-384cb.appspot.com",
  messagingSenderId: "234202193603",
  appId: "1:234202193603:web:9ff551f42c4cae73130c76",
  measurementId: "G-EGDPSKXZDR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
