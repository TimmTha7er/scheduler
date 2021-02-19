import {
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
} from '../action-types';
import { AuthActionsType, IAuthState } from '../interfaces';

const initialState: IAuthState = {
  user: null,
  authenticated: false,
  loading: true,
  error: '',
  needVerification: false,
  success: '',
};

const authReducer = (
  state = initialState,
  action: AuthActionsType
): IAuthState => {
  if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
      error: '',
      success: '',
    };
  }

  if (action.type === SET_SUCCESS) {
    return {
      ...state,
      success: action.payload,
      loading: false,
      error: '',
    };
  }

  if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload,
      loading: false,
      success: '',
    };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
      authenticated: true,
      loading: false,
      error: '',
      success: '',
    };
  }

  if (action.type === SIGN_OUT) {
    return {
      ...state,
      user: null,
      authenticated: false,
      loading: false,
      error: '',
      success: '',
    };
  }

  if (action.type === NEED_VERIFICATION) {
    return {
      ...state,
      needVerification: action.payload,
    };
  }

  return state;
};

export { authReducer };
