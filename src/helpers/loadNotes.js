import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {

    if ( !uid ) throw new Error('El UID del usuario no existe');


    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);

    const docs = await getDocs( collectionRef );

    const notes = [];
    

    docs.forEach( doc => notes.push({ id: doc.id, ...doc.data() }));
    console.log(notes);
    
    return notes;
};


 //* saca el id de toda la info que trae la promesa en docs, dentro de data functin esta lo demas 
    //* body, date, title, se aniade el id y se lanza un nuevo array de objetos de las notas