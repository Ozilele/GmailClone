import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCT02eX6-P2ENlozQmVX35pU1cF94_FxqA",
  authDomain: "clone-5714c.firebaseapp.com",
  projectId: "clone-5714c",
  storageBucket: "clone-5714c.appspot.com",
  messagingSenderId: "967225212491",
  appId: "1:967225212491:web:19fb1055a52900891697ce"
};

const firebaseApp = initializeApp(firebaseConfig); // connecting frontend to backend
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export  { db, auth, provider };