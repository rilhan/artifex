import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQ66UMRIkbzz8cRXGK8LtamsntpnKLCRg", //process.env.REACT_APP_apiKey,
    authDomain: "ai-art-d0a5e.firebaseapp.com",
    projectId: "ai-art-d0a5e",
    storageBucket: "ai-art-d0a5e.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };