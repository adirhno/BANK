
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyADqN568lpUUzqP6jyfRBF7_RkxBn17G4g",
  authDomain: "e-court-system.firebaseapp.com",
  projectId: "e-court-system",
  storageBucket: "e-court-system.appspot.com",
  messagingSenderId: "631319207789",
  appId: "1:631319207789:web:67d3d343d8444aa45a4464",
  measurementId: "G-RH1NNFRKRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app)
   


export const signInWithGoogle = async function() {
    const provider = new GoogleAuthProvider()
   try{
        return signInWithPopup( auth, provider)
   }catch (e){
    console.log(e)
   }
}