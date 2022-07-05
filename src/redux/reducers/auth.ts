import { AuthState, AuthAction, AuthActionTypes } from '../types';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: true,
  error: { message: '' },
  needVerification: false,
  success: '',
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  if (action.type === AuthActionTypes.SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
      error: { message: '' },
      success: '',
    };
  }

  if (action.type === AuthActionTypes.SET_SUCCESS) {
    return {
      ...state,
      success: action.payload,
      loading: false,
      error: { message: '' },
    };
  }

  if (action.type === AuthActionTypes.SET_ERROR) {
    return {
      ...state,
      error: action.payload,
      loading: false,
      success: '',
    };
  }

  if (action.type === AuthActionTypes.SET_USER) {
    return {
      ...state,
      user: action.payload,
      authenticated: true,
      loading: false,
      error: { message: '' },
      success: '',
    };
  }

  if (action.type === AuthActionTypes.SIGN_OUT) {
    return {
      ...state,
      user: null,
      authenticated: false,
      loading: false,
      error: { message: '' },
      success: '',
    };
  }

  if (action.type === AuthActionTypes.NEED_VERIFICATION) {
    return {
      ...state,
      needVerification: action.payload,
    };
  }

  return state;
};

export { authReducer };
