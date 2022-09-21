import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBN227PRqP0XwF0XeCV6Q4e45E_G4Rk3hY",
  authDomain: "chat-app-68228.firebaseapp.com",
  projectId: "chat-app-68228",
  storageBucket: "chat-app-68228.appspot.com",
  messagingSenderId: "445088784966",
  appId: "1:445088784966:web:a1d3e487dcd9c0c217e047"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db =  getFirestore();