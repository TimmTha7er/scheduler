import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { User } from './auth';

// action types
export enum AdminActionTypes {
  FETCH_USERS_REQUESTED = 'admin/FETCH_USERS_REQUESTED',
  FETCH_USERS_LOADED = 'admin/FETCH_USERS_LOADED',
  FETCH_USERS_ERROR = 'admin/FETCH_USERS_ERROR',
  EDIT_USER = 'admin/EDIT_USER',
  SET_SELECTED_USER = 'admin/SET_SELECTED_USER',
  SET_SORT_ORDER = 'admin/SET_SORT_ORDER',
  SET_ORDER = 'admin/SET_ORDER',
  SET_FILTER = 'admin/SET_FILTER',
}

// reducer
export interface AdminState {
  users: User[];
  loading: boolean;
  error: null | {};
  selectedUser: null | User;
  sortBy: string;
  order: 'asc' | 'desc';
  filterBy: string;
}

// actions
interface UsersRequested {
  type: typeof AdminActionTypes.FETCH_USERS_REQUESTED;
}

interface UsersLoaded {
  type: typeof AdminActionTypes.FETCH_USERS_LOADED;
  payload: AdminState['users'];
}

interface UsersEror {
  type: typeof AdminActionTypes.FETCH_USERS_ERROR;
  payload: AdminState['error'];
}

interface SetSelectedUser {
  type: typeof AdminActionTypes.SET_SELECTED_USER;
  payload: AdminState['selectedUser'];
}

interface EditUser {
  type: typeof AdminActionTypes.EDIT_USER;
  payload: User;
}

interface SetSortOrder {
  type: typeof AdminActionTypes.SET_SORT_ORDER;
  payload: AdminState['sortBy'];
}

interface SetOrder {
  type: typeof AdminActionTypes.SET_ORDER;
  payload: AdminState['order'];
}

interface SetFilter {
  type: typeof AdminActionTypes.SET_FILTER;
  payload: AdminState['filterBy'];
}

export type AdminAction =
  | UsersRequested
  | UsersLoaded
  | UsersEror
  | SetSelectedUser
  | EditUser
  | SetSortOrder
  | SetOrder
  | SetFilter;

export type AdminThunkAction = ThunkAction<void, RootState, null, AdminAction>;
