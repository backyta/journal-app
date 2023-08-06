import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //* Efecto que revise si la persona esta autenticada o no

    useEffect(() => {
      
      onAuthStateChanged( FirebaseAuth, async( user )=> {
        if( !user ) return dispatch( logout() );

        const { uid, email, displayName, photoURL } =  user;

        dispatch( login({ uid, email, displayName, photoURL }) );
        dispatch( startLoadingNotes( )); // perimero se obntiene el id en el dispatch anterior
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

     //* regresa un observable, en este caso no queremos limpiarlo porque siempre quiro estar pendiente
      //* del cambio de la autenticacion


    return{
        status
    };
};
