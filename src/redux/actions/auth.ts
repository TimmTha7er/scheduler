import {
  ISignUpData,
  ISignInData,
  IUser,
  AuthThunkActionType,
  AuthActionsType,
} from '../interfaces';
import {
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
} from '../action-types';
import AuthService from '../../services/AuthService';

const authService = new AuthService();

// Create user
export const signup = (data: ISignUpData): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const userData: IUser = await authService.signUp(
        data.email,
        data.password,
        data.firstName
      );
      
      dispatch(setNeedVerification(true));
      dispatch(userLoaded(userData));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

// Get user by id
export const getUserById = (id: string): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const userData: IUser = await authService.getUserById(id);

      dispatch(userLoaded(userData));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

// Log in
export const signin = (data: ISignInData): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.signIn(data.email, data.password);
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

// Log out
export const signout = (): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

// Send password reset email
export const sendPasswordResetEmail = (
  email: string,
  successMsg: string
): AuthThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await authService.sendPasswordResetEmail(email);
      dispatch(setSuccess(successMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  };
};

// Set loading
export const setLoading = (value: boolean): AuthActionsType => {
  return {
    type: SET_LOADING,
    payload: value,
  };
};

// Set error
export const setError = (msg: string): AuthActionsType => {
  return {
    type: SET_ERROR,
    payload: msg,
  };
};

// Set need verification
export const setNeedVerification = (value:boolean): AuthActionsType => {
  return {
    type: NEED_VERIFICATION,
    payload: value,
  };
};

// Set success
export const setSuccess = (msg: string): AuthActionsType => {
  return {
    type: SET_SUCCESS,
    payload: msg,
  };
};

// Set user
const userLoaded = (userData: IUser): AuthActionsType => {
  return {
    type: SET_USER,
    payload: userData,
  };
};
