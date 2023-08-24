import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBt-lT4qyUA3qoXJ2NwR0kNdAWrcFNvzU8",
    authDomain: "miniblog-b654e.firebaseapp.com",
    projectId: "miniblog-b654e",
    storageBucket: "miniblog-b654e.appspot.com",
    messagingSenderId: "520708521434",
    appId: "1:520708521434:web:062591e506c0441208d4e3"
  };
  
  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };