import {
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADED,
  FETCH_USERS_ERROR,
  EDIT_USER,
} from '../action-types';
import { IAdminState, AdminActionsType } from '../interfaces';

const initialState: IAdminState = {
  users: [],
  loading: true,
  error: null,
};

const adminReducer = (
  state = initialState,
  action: AdminActionsType
): IAdminState => {
  if (action.type === FETCH_USERS_REQUESTED) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCH_USERS_LOADED) {
    return {
      ...state,
      users: action.payload,
      loading: false,
      error: null,
    };
  }

  if (action.type === FETCH_USERS_ERROR) {
    return {
      ...state,
      users: [],
      loading: false,
      error: action.payload,
    };
  }

  // if (action.type === EDIT_USER) {
  //   return {
  //     ...state,
  //     users: [...state.users, ...action.payload],
  //   };
  // }

  return state;
};

export { adminReducer };
