import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALbss7j3OOuyPEsHU1gTdvLvoXYoPsUXQ",
    authDomain: "todo-62432.firebaseapp.com",
    projectId: "todo-62432",
    storageBucket: "todo-62432.appspot.com",
    messagingSenderId: "947592268158",
    appId: "1:947592268158:web:501be4e7109d6f816d0b2f",
    measurementId: "G-XP6J4W38QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

