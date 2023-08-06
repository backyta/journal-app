import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
  name: 'journal',
  initialState:{
    isSaving: false,
    messageSaved: '',
    menssageDeleted:'',
    notes: [],
    active:null,
    // active:{ //nota activas
    //     id:'abc1234',
    //     title: '',
    //     body: '',
    //     date: 123455,
    //     imageUrls: []
    // }
  },
  reducers: { //tiene que ser trbaja sincrono, son functions pures
    savingNewNote:(state)=>{
        state.isSaving = true;
        state.messageSaved = '';
    },
    addNewEmptyNote: (state, action) =>{
        state.notes.push( action.payload );
        state.isSaving = false;
    },
    setActiveNote: ( state, action ) =>{
        state.active= action.payload; //pasa toda la carga util
    },
    setNotes:( state, action) =>{
      state.notes =  action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';

    },
    updatedNote: (state, action) =>{
      state.isSaving = false;
      state.notes = state.notes.map( note => {

        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

    },
    setPhotosToActiveNote: ( state, action ) =>{

      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;

    },
    clearNotesLogout:(state) => {
      state.isSaving =  false;
      state.messageSaved = '';
      state.notes= [];
      state.active = null;
    },
    deleteNoteById: (state, action) =>{

      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload);//* elimina o filtra todos los que sean diferentes al id que se esta pasando
      state.menssageDeleted = `Nota borrada correctamente`;
    }
  } 
});

export const {
    addNewEmptyNote, 
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updatedNote,
  } = journalSlice.actions;

