// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAXN1ubx6PX5tcshz3pcGFXxtOcYjYMF-k",
  authDomain: "japanese-vocab-learner.firebaseapp.com",
  projectId: "japanese-vocab-learner",
  storageBucket: "japanese-vocab-learner.appspot.com",
  messagingSenderId: "38400261519",
  appId: "1:38400261519:web:f1c3b61100b0e7cbf3dffa",
  measurementId: "G-1X7VK3P02L",
  databaseURL: "https://japanese-vocab-learner-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


export {app, auth, analytics};