// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtHuyaX3XM1W6CBnqq9FAOpwDDusXwoTI",
  authDomain: "to-do-app-2fb71.firebaseapp.com",
  projectId: "to-do-app-2fb71",
  storageBucket: "to-do-app-2fb71.appspot.com",
  messagingSenderId: "757837390992",
  appId: "1:757837390992:web:8fd4df72bd58e07df56415",
  measurementId: "G-W5J37SFZLS",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
