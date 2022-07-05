import {
  AdminAction,
  AdminActionTypes,
  AdminThunkAction,
  AdminState,
  User,
} from '../types';
import AdminService from '../../services/AdminService';

const adminService = new AdminService();

export const fetchUsers = (
  sortBy: AdminState['sortBy'],
  order: AdminState['order']
): AdminThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(usersRequested());
      const events = await adminService.getUsers(sortBy, order);
      dispatch(usersLoaded(events));
    } catch (error) {
      dispatch(usersError(error as AdminState['error']));
    }
  };
};

export const editUser = (user: User): AdminThunkAction => {
  return async (dispatch) => {
    try {
      await adminService.editUser(user);

      dispatch({
        type: AdminActionTypes.EDIT_USER,
        payload: user,
      });
    } catch (error) {
      dispatch(usersError(error as AdminState['error']));
    }
  };
};

const usersRequested = (): AdminAction => {
  return {
    type: AdminActionTypes.FETCH_USERS_REQUESTED,
  };
};

export const usersLoaded = (events: AdminState['users']): AdminAction => {
  return {
    type: AdminActionTypes.FETCH_USERS_LOADED,
    payload: events,
  };
};

const usersError = (error: AdminState['error']): AdminAction => {
  return {
    type: AdminActionTypes.FETCH_USERS_ERROR,
    payload: error,
  };
};

export const setSelectedUser = (
  user: AdminState['selectedUser']
): AdminAction => {
  return {
    type: AdminActionTypes.SET_SELECTED_USER,
    payload: user,
  };
};

export const setSortOrder = (sortBy: AdminState['sortBy']): AdminAction => {
  return {
    type: AdminActionTypes.SET_SORT_ORDER,
    payload: sortBy,
  };
};

export const setOrder = (order: AdminState['order']): AdminAction => {
  return {
    type: AdminActionTypes.SET_ORDER,
    payload: order,
  };
};

export const setFilter = (filter: AdminState['filterBy']): AdminAction => {
  return {
    type: AdminActionTypes.SET_FILTER,
    payload: filter,
  };
};
