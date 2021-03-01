import {
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADED,
  FETCH_USERS_ERROR,
  EDIT_USER,
  SET_SELECTED_USER,
  SET_SORT_ORDER,
  SET_ORDER,
  SET_FILTER,
} from '../action-types';
import { AdminActionsType, AdminThunkActionType, IUser } from '../interfaces';
import AdminService from '../../services/AdminService';

const adminService = new AdminService();

export const fetchUsers = (
  sortBy: string,
  order: 'asc' | 'desc'
): AdminThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(usersRequested());
      const events = await adminService.getUsers(sortBy, order);
      dispatch(usersLoaded(events));
    } catch (error) {
      dispatch(usersError(error));
    }
  };
};

export const editUser = (user: IUser): AdminThunkActionType => {
  return async (dispatch) => {
    try {
      await adminService.editUser(user);

      dispatch({
        type: EDIT_USER,
        payload: user,
      });
    } catch (error) {
      dispatch(usersError(error));
    }
  };
};

const usersRequested = (): AdminActionsType => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

export const usersLoaded = (events: IUser[]): AdminActionsType => {
  return {
    type: FETCH_USERS_LOADED,
    payload: events,
  };
};

const usersError = (error: {}): AdminActionsType => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

export const setSelectedUser = (user: IUser | null): AdminActionsType => {
  return {
    type: SET_SELECTED_USER,
    payload: user,
  };
};

export const setSortOrder = (sortBy: string): AdminActionsType => {
  return {
    type: SET_SORT_ORDER,
    payload: sortBy,
  };
};

export const setOrder = (order: 'asc' | 'desc'): AdminActionsType => {
  return {
    type: SET_ORDER,
    payload: order,
  };

};
export const setFilter = (filter: string): AdminActionsType => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};
