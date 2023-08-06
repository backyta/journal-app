import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGalery } from "../components/ImageGalery";
import { useForm } from "../../hooks/useForm";

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {

    const dispatch = useDispatch();
    
    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal ); // objeto nota

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => { //cachea la funcion para convertir el date

        const newDate = new Date( date );
        return newDate.toUTCString();

    },[date]); 
    //* memorizar porque si el titulo o body cambia no a lanza el dateString denuevo solo cuando el date o la 
    //* nota completa cambia es decir

    //* Mantiene la referencia html a nuestro input en el button que estilizamos

    const fileInputRef = useRef();

    useEffect(() => {
        
        dispatch( setActiveNote(formState) );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]);
    //* cuando cambia se ahce el dispatch de una nueva texto que se agrega con el input y setea en el 
    //* setActive note y cambia el estado en mi reducer


    useEffect(() => {
        
        if ( messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
        //* no poner return porque seria la funcion de limpieza y no se dispararia hasta que el componente
        //* sea destruido

    }, [messageSaved]);



    const onSaveNote =() =>{

        dispatch( startSaveNote() );
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return; 
        
        dispatch( startUploadingFiles(target.files));
        
        // console.log('subiendo archivos');
    };


    const onDelete = () =>{
        dispatch( startDeletingNote());
    };

    return (
       <Grid 
            className="animate__animated animate__fadeIn animate__faster"
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ mb:1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>
                <input 
                    type="file" 
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display:'none'}}
                    ref={ fileInputRef }
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ ()=> fileInputRef.current.click() } // simula el click sobre el input
                >
                    <UploadOutlined/>
                </IconButton>
                <Button 
                    disabled={isSaving}
                    color="primary" 
                    sx={{ padding:2 }}
                    onClick={ onSaveNote }
                    >
                    <SaveOutlined sx={{ fontSize:30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un Titulo"
                    label="Titulo"
                    sx={{  border: 'none', mb:1 }}
                    name="title"
                    value={title}
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio en el dia de hoy?"
                    minRows={ 5 }
                    name="body"
                    value={body}
                    onChange={ onInputChange }
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{mt:2}}
                    color="error"

                >
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            {/* Galeriaa de imagenes */}
            <ImageGalery images={ note.imageUrls }/> 

       </Grid>
    );
};
//*para un array que lee en el otro archivo y lo barre(note.imageUrls)

//* Un box es como un div, y un grid permite manejar sus elementos internos como el alineamiento y por defect
//* ayud a organizarse mejor que un box