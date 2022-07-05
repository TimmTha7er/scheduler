import {
  AuthAction,
  AuthThunkAction,
  AuthActionTypes,
  AuthState,
  SignUpData,
  SignInData,
  User,
} from '../types';
import AuthService from '../../services/AuthService';

const authService = new AuthService();

// Create user
export const signup = (data: SignUpData): AuthThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const userData: User = await authService.signUp(
        data.email,
        data.password,
        data.firstName
      );

      dispatch(setNeedVerification(true));
      dispatch(userLoaded(userData));
    } catch (err) {
      console.log(err);
      dispatch(setError(err as AuthState['error']));
    }
  };
};

// Get user by id
export const getUserById = (id: User['id']): AuthThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const userData: User = await authService.getUserById(id);

      dispatch(userLoaded(userData));
    } catch (err) {
      console.log(err);
      dispatch(setError(err as AuthState['error']));
    }
  };
};

// Log in
export const signin = (data: SignInData): AuthThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.signIn(data.email, data.password);
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setError(err as AuthState['error']));
    }
  };
};

// Log out
export const signout = (): AuthThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.signOut();
      dispatch({
        type: AuthActionTypes.SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

// Send password reset email
export const sendPasswordResetEmail = (
  email: User['email'],
  successMsg: AuthState['success']
): AuthThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err as AuthState['error']));
    }
  };
};

// Set loading
export const setLoading = (value: AuthState['loading']): AuthAction => {
  return {
    type: AuthActionTypes.SET_LOADING,
    payload: value,
  };
};

// Set error
export const setError = (msg: AuthState['error']): AuthAction => {
  return {
    type: AuthActionTypes.SET_ERROR,
    payload: msg,
  };
};

// Set need verification
export const setNeedVerification = (
  value: AuthState['needVerification']
): AuthAction => {
  return {
    type: AuthActionTypes.NEED_VERIFICATION,
    payload: value,
  };
};

// Set success
export const setSuccess = (msg: AuthState['success']): AuthAction => {
  return {
    type: AuthActionTypes.SET_SUCCESS,
    payload: msg,
  };
};

// Set user
const userLoaded = (userData: User): AuthAction => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: userData,
  };
};
