import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

// action types
export enum AuthActionTypes {
  SET_USER = 'auth/SET_USER',
  SIGN_OUT = 'auth/SIGN_OUT',
  SET_LOADING = 'auth/SET_LOADING',
  SET_ERROR = 'auth/SET_ERROR',
  NEED_VERIFICATION = 'auth/NEED_VERIFICATION',
  SET_SUCCESS = 'auth/SET_SUCCESS',
}

// reducer
export interface User {
  firstName: string;
  email: string;
  id: string;
  createdAt?: string | {};
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: null | { message: string; };
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// actions
interface SetUser {
  type: typeof AuthActionTypes.SET_USER;
  payload: User;
}

interface SetLoading {
  type: typeof AuthActionTypes.SET_LOADING;
  payload: AuthState['loading'];
}

interface SignOut {
  type: typeof AuthActionTypes.SIGN_OUT;
}

interface SetError {
  type: typeof AuthActionTypes.SET_ERROR;
  payload: AuthState['error'];
}

interface NeedVerification {
  type: typeof AuthActionTypes.NEED_VERIFICATION;
  payload: AuthState['needVerification'];
}

interface SetSuccess {
  type: typeof AuthActionTypes.SET_SUCCESS;
  payload: AuthState['success'];
}

export type AuthAction =
  | SetUser
  | SetLoading
  | SignOut
  | SetError
  | NeedVerification
  | SetSuccess;

export type AuthThunkAction = ThunkAction<void, RootState, null, AuthAction>;
