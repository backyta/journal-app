import {  collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updatedNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";

import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () =>{
    return async( dispatch, getState ) =>{ // trae el estado de los reducers

        dispatch( savingNewNote() ); //deshabilita el button +

        const{ uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            imageUrls:[],
            date: new Date().getTime()
        };

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ));
        await setDoc( newDoc, newNote); //* mandar a grabar
        
        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote )); //nota vacia pero con el id de firebase, lo devueelve a false
        dispatch( setActiveNote( newNote )); //
    };

}; 


export const startLoadingNotes = ( ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !uid ) {
            throw new Error ('El uid del usuario no existe');
        }
        // console.log(uid);

       const notes =  await loadNotes( uid );
        dispatch( setNotes( notes ) );
    };
};



export const startSaveNote = () => {
    return async( dispatch, getState ) =>{

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        
        delete noteToFireStore.id;
        //* No pasamos el id que viene en la nota, lo eliminamos

        console.log(noteToFireStore);
        // console.log(noteToFIreStore);
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`); //maldito espacio

        await setDoc( docRef, noteToFireStore,{ merge: true} );

        dispatch( updatedNote( note ) );

    };
};

export const startUploadingFiles = (files=[]) => {
    return async ( dispatch ) =>{

        dispatch( setSaving() ); //* bloquea botnes y pone la app en estado de carga

        // await fileUpload( files[0]);

        const fileUploadPromises = [];

        //* barre y retorna las promesas que estan dentro estan las url de iamgenes que se subiran a 
        //* cluddinary, retorna en un nuevo array
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));
        }
        //* resolvemos con primise all todo el array del promesas del bucle y devolvemos
        //* las url resultas.

        const photosUrl = await Promise.all( fileUploadPromises ); //array de imagenes
        console.log(photosUrl);

        dispatch( setPhotosToActiveNote( photosUrl ));

    };

};

export const startDeletingNote = () => {
    return async( dispatch , getState) => {
        
        const { uid } = getState(). auth;
        const { active: note } = getState().journal;

        // console.log({ uid, note });
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`);
        await deleteDoc( docRef );
       
        dispatch( deleteNoteById( note.id ));

       
    };
};