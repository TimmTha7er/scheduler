import {
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADED,
  FETCH_USERS_ERROR,
	EDIT_USER
} from '../action-types';
import { AdminActionsType, AdminThunkActionType, IUser } from '../interfaces';
import AdminService from '../../services/AdminService';

const adminService = new AdminService();

export const fetchUsers = (): AdminThunkActionType => {
  return async (dispatch) => {
    try {
      // console.log('fetch users');

      dispatch(usersRequested());
      const events = await adminService.getUsers();
      dispatch(usersLoaded(events));
    } catch (error) {
      dispatch(usersError(error));
    }
  };
};

// export const editUser = (): AdminActionsType => {
//   return async (dispatch) => {
//     try {
//       const newUser = await adminService.editUser();

//       dispatch({
//         type: EDIT_USER,
//         payload: newUser,
//       });
//     } catch (error) {
//       dispatch(usersError(error));
//     }
//   };
// };

const usersRequested = (): AdminActionsType => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const usersLoaded = (events: IUser[]): AdminActionsType => {
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
