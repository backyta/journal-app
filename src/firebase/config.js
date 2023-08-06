// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';


// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwcy_e6X9p4pbc1SPNB3TFPjhUm-m5Ob8",
  authDomain: "react-cursos-ba8c7.firebaseapp.com",
  projectId: "react-cursos-ba8c7",
  storageBucket: "react-cursos-ba8c7.appspot.com",
  messagingSenderId: "118103909291",
  appId: "1:118103909291:web:f7b87bb488e92e2afb28ee"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); // para la parte de la autenticacion y la DB / testing
export const FirebaseAuth = getAuth( FirebaseApp ); // funcionalidades de autenticacion
export const FirebaseDB = getFirestore( FirebaseApp ); // configuracion de base de datos