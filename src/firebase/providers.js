import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const singInWithGoogle = async() =>{

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        // se puede obtner las credenciales y un token para autenticar del lado de google, muchas cosas
        // console.log({credentials});
        // const user = result.user;

        const { displayName, email, photoURL, uid } = result.user;

        return{
            ok: true,
            //user info
            displayName, email, photoURL, uid
        };

    } catch (error) {
      
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return{
            ok: false,
            errorMessage,
            errorCode
        };
    }

};


export const registerUserWithEmailPassword = async ({ email, password, displayName}) =>{

    try {
        
       const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL, } = resp.user;
    
       //Todo: actualizar el usuario o el display name en Firebase

       await updateProfile( FirebaseAuth.currentUser, { displayName });

       return{
        ok: true,
        uid, photoURL, email, displayName
       };

    } catch (error) {
        return{
            ok: false,
            errorMessage: error.message //colocar mensaje de erro
        };
    }

};


export const loginWithEmailPassword = async ({ email, password }) =>{
    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log(resp);
        const { uid, photoURL,displayName } = resp.user;

        return{
            ok: true,
            uid, photoURL, displayName
        };

    } catch (error) {
        return{
            ok: false,
            errorMessage: error.message, //colocar mensaje de erro
           
        };
    }

};

export const logoutFirebase = async () =>{

    return await FirebaseAuth.signOut(); //cierra todos los metodos de autenticacion
};






//* Aqui estaran todos nuestros proveedores de autenticacion