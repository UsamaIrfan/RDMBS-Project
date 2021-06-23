import { SET_USER } from "./actionTypes"

import { firebase, auth } from '../config/Firebase';
var googleprovider = new firebase.auth.GoogleAuthProvider();

// Auth =======================================================> 


export const login = (Email, password, setError, history) => {
    // login Logic
    return (dispatch) => {
        console.log("Rngg")
        auth.signInWithEmailAndPassword(Email, password)
            .then((auth) => {
                // Logged in set forms display to none.
                console.log(auth)
                dispatch({
                    type: SET_USER,
                    user: auth
                })
                history.push("/dashboard")
            })
            .catch((err) => {
                console.log(err.message, err)
                if (err.code === "auth/invalid-email") {
                    setError(state => ({ ...state, Email: true }))
                } else if (err.code === "auth/wrong-password") {
                    setError(state => ({ ...state, Password: true }))
                }
            })
    }
}

export const authenticateUser = (history) => {
    return (dispatch) => {
        console.log("Running")
        firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // The user is Logged in
                dispatch({
                    type: SET_USER,
                    user: authUser
                });
            } else {
                // The user is logged out
                dispatch({
                    type: SET_USER,
                    user: null
                });
                history.push("/login")
            }
        })
    }
}

export const signOut = (history) => {
    return (dispatch, getState) => {
        const user = getState()
        if (user) {
            firebase.auth().signOut();
            dispatch({
                type: SET_USER,
                user: null,
            })
            history.push("/login")
        }
    }
}


// Auth =======================================================>