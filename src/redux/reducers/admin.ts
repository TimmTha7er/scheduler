import {
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADED,
  FETCH_USERS_ERROR,
  EDIT_USER,
  SET_SELECTED_USER,
  SET_SORT_ORDER,
} from '../action-types';
import { IAdminState, AdminActionsType, IUser } from '../interfaces';

const initialState: IAdminState = {
  users: [],
  loading: true,
  error: null,
  selectedUser: null,
  orderBy: 'firstName',
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

  if (action.type === SET_SELECTED_USER) {
    return {
      ...state,
      selectedUser: action.payload,
    };
  }

  if (action.type === EDIT_USER) {
    const newUser = action.payload;
    const idx = state.users.findIndex((user: IUser) => user.id === newUser.id);

    const newUsers = [
      ...state.users.slice(0, idx),
      newUser,
      ...state.users.slice(idx + 1),
    ];

    return {
      ...state,
      users: newUsers,
    };
  }

  if (action.type === SET_SORT_ORDER) {
    return {
      ...state,
      orderBy: action.payload,
    };
  }

  return state;
};

export { adminReducer };
