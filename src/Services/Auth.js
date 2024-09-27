import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export const firebaseRegister = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const firebaseLogin = async (email, password) => {
    // try catch
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("Uid", user.uid);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error signing in: ${errorCode} - ${errorMessage}`);
    }

    // Old
    // signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         localStorage.setItem("Uid", user.uid);
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //     });
};

export const firebaseLogout = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log(error);
        alert("Error in Log Out");
    });
};

export const isLogin = () => {
    let result = false;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            result = true;
        }
    });
    return result;
};