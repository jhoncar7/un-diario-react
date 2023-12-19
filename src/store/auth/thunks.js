import { registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
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

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({email, password, displayName});

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }
}

