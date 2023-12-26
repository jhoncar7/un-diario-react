import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {
    return async (dispatch, getstate) => {

        dispatch(savingNewNote());

        // console.log(getstate());
        const { uid } = getstate().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        // console.log({ newDoc});
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getstate) => {

        const { uid } = getstate().auth;

        if (!uid) throw new Error('El id del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
}

export const startSaveNote = () => {
    return async (dispatch, getstate) => {

        dispatch(setSaving());

        const { uid } = getstate().auth;
        const { active: note } = getstate().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        // console.log(noteToFireStore);

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())

        // const url = await fileUpload(files[0]);
        // console.log({ url });

        const fileUploadPromise = [];
        for (const file of files) {
            fileUploadPromise.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromise);
        // console.log({ photosUrls });

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getstate) => {

        const { uid } = getstate().auth;
        const { active: note } = getstate().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}