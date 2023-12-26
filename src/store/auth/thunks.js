import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAuthentication = (email, password) => {
    return async (dispatch, getState) => {

        dispatch(checkingCredentials());
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        // dispatch(singInWithGoogle());
        const result = await singInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));

    }
}

export const startLoginWithEmailPassword = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword(email, password);

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));

    }
}

export const startLogout = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());

    }
}