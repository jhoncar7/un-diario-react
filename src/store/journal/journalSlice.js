import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active:{
        //     id:'123',
        //     title:'',
        //     body:'',
        //     date:1234,
        //     imageUrls:[]
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            // state.isSaving = action.payload;
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            console.log(action.payload);
            state.notes = state.notes.map(nota => {
                if (nota.id === action.payload.id)
                    nota = action.payload
                return nota;
            });
            state.messageSaved = `${action.payload.title}, actualizada correctamente!!`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(nota => nota.id !== action.payload);
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
    }
});

export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
} = journalSlice.actions;