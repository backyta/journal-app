
import { singInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () =>{
    return async ( dispatch ) =>{

        dispatch( checkingCredentials() );

    };
}; 

export const startGoogleSingIn = () =>{
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await singInWithGoogle();
        // console.log({result});

        if ( !result.ok ) return dispatch( logout( result.errorMessage ));
        // delete result.ok
        dispatch( login( result ) );
        
    };
};


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>{
    
    return async( dispatch )=>{

        dispatch( checkingCredentials() );

       const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName } );
  
       if( !ok ) return dispatch( logout({errorMessage}) );
       //* si sale en false lanzamo el logout y el mensaje de etto
       //* si todo sale bien llegeamos al usuario

       dispatch( login({ uid, displayName, email, photoURL }));
    };
};

//? Autenticacion de usuario ya registradi para logearse

export const startLoginWithEmailPassword = ({ email, password }) =>{
    return async( dispatch )=>{

       
        dispatch( checkingCredentials() );
        const result = await loginWithEmailPassword({ email, password});
        // console.log(result);
        
        if( !result.ok ) return dispatch( logout( result ) );

        dispatch( login( result ) );
    };
};


export const startLogout = () =>{
    return async(dispatch) =>{

        await logoutFirebase();
        dispatch( checkingCredentials() );

        dispatch( clearNotesLogout());

        dispatch( logout({}) );
        
    };
};




//* acciones que se pueden hacer dispatch o despachar pero internamente tienen una tarea asincrona

//* El async no afecta ni devuleve una promesa del disptch porque esto es suncrono solo sirve para trabajar
//* await, y esperar a que se resuelva la peticion externa y esta se puede pasar a otro dispatch
//* para que lo llame de manera sincrona, finalmente el dispatch llamado actualiza y entrega un nuevo estado.

//? Ejemplo

// import { checkingCredentials } from "./authSlice";

// export const checkingAuthentication = () => {
//   return async (dispatch) => {
//     // Hacer alguna tarea asíncrona, como una solicitud HTTP
//     try {
//       const response = await fetch("https://example.com/check_credentials");
//       const data = await response.json();

//       // Despachar una acción en función del resultado de la tarea asíncrona
//       if (data.isAuthenticated) {
//         dispatch({ type: "AUTH_SUCCESS" });
//       } else {
//         dispatch({ type: "AUTH_FAILURE" });
//       }
//     } catch (error) {
//       dispatch({ type: "AUTH_ERROR", payload: error.message });
//     }
//   };
// };




