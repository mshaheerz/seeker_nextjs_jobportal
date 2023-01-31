// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQFcxsSLzHSwGpyVuVIdlxlxsPygucOrw",
  authDomain: "seeker-ce158.firebaseapp.com",
  projectId: "seeker-ce158",
  storageBucket: "seeker-ce158.appspot.com",
  messagingSenderId: "281024720319",
  appId: "1:281024720319:web:1e9ac17a43c89f9798050a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db=getFirestore();
export const storage = getStorage();
export const auth = getAuth(app);

export default app