import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { AUTH_ERROR, AUTH_SUCCESS, SET_USER, SIGNOUT } from 'contexts/types';
import { firebase, db } from 'firebase-config/firebase';
import authReducer from './authReducer';
import AuthContext from './AuthContext';

const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signUp = async ({ name, email, password }) => {
    const DEFAULT_IMAGE_URL =
      'https://firebasestorage.googleapis.com/v0/b/chat-c063c.appspot.com/o/assets%2Fuser.png?alt=media&token=a6fa6d73-3ac4-4e89-ad36-55904f4de284';
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (res.user) {
        db.collection('users')
          .doc(res.user.uid)
          .set({
            displayName: name,
            photoURL: DEFAULT_IMAGE_URL,
            email,
            uid: res.user.uid,
            online: true,
          });
      }

      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          displayName: name,
        },
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (res.user) {
        db.collection('users')
          .doc(res.user.uid)
          .update({
            online: true,
          });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const authWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const res = await firebase.auth().signInWithPopup(provider);

      if (res.user) {
        db.collection('users')
          .doc(res.user.uid)
          .set({
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email,
            uid: res.user.uid,
            online: true,
          });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const signOut = async () => {
    try {
      await db
        .collection('users')
        .doc(state.user.uid)
        .update({
          online: false,
        });
      firebase.auth().signOut();
      dispatch({ type: SIGNOUT });
    } catch (err) {
      console.log(err);
    }
  };

  const authStateChangeHandler = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await db
          .collection('users')
          .doc(user.uid)
          .update({
            online: true,
          });

        const res = await db
          .collection('users')
          .doc(user.uid)
          .get();

        const { displayName, email, photoURL, uid } = res.data();

        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            displayName,
            email,
            photoURL,
            uid,
          },
        });
      } else {
        dispatch({ type: AUTH_ERROR });
      }
    });
  };

  const setUserOffline = async () => {
    await db
      .collection('users')
      .doc(state.user.uid)
      .update({
        online: false,
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        signIn,
        signUp,
        signOut,
        authWithGoogle,
        authStateChangeHandler,
        setUserOffline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthState;
