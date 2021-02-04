import {
  SignUpData,
  SignInData,
  User,
  AuthThunkActionType,
} from '../interfaces';
import {
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
} from '../action-types';
import firebase from '../../services/firebase/config';

// Create user
export const signup = (
  data: SignUpData,
  onError: () => void
): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: res.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        await firebase
          .firestore()
          .collection('/users')
          .doc(res.user.uid)
          .set(userData);
        await res.user.sendEmailVerification();

        dispatch({
          type: NEED_VERIFICATION,
        });
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message,
      });
    }
  };
};

// Get user by id
export const getUserById = (id: string): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      const user = await firebase.firestore().collection('users').doc(id).get();
			
      if (user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// Set loading
export const setLoading = (value: boolean): AuthThunkActionType => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

// Log in
export const signin = (
  data: SignInData,
  onError: () => void
): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

// Log out
export const signout = (): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

// Set error
export const setError = (msg: string): AuthThunkActionType => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

// Set need verification
export const setNeedVerification = (): AuthThunkActionType => {
  return (dispatch) => {
    dispatch({
      type: NEED_VERIFICATION,
    });
  };
};

// Set success
export const setSuccess = (msg: string): AuthThunkActionType => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

// Send password reset email
export const sendPasswordResetEmail = (
  email: string,
  successMsg: string
): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};
