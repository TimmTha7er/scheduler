import { AdminState, AdminActionTypes, AdminAction, User } from '../types';

const initialState: AdminState = {
  users: [],
  loading: true,
  error: null,
  selectedUser: null,
  sortBy: 'firstName',
  order: 'desc',
  filterBy: '',
};

const adminReducer = (
  state = initialState,
  action: AdminAction
): AdminState => {
  if (action.type === AdminActionTypes.FETCH_USERS_REQUESTED) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === AdminActionTypes.FETCH_USERS_LOADED) {
    return {
      ...state,
      users: action.payload,
      loading: false,
      error: null,
    };
  }

  if (action.type === AdminActionTypes.FETCH_USERS_ERROR) {
    return {
      ...state,
      users: [],
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === AdminActionTypes.SET_SELECTED_USER) {
    return {
      ...state,
      selectedUser: action.payload,
    };
  }

  if (action.type === AdminActionTypes.EDIT_USER) {
    const newUser = action.payload;
    const idx = state.users.findIndex((user: User) => user.id === newUser.id);

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

  if (action.type === AdminActionTypes.SET_SORT_ORDER) {
    return {
      ...state,
      sortBy: action.payload,
    };
  }

  if (action.type === AdminActionTypes.SET_ORDER) {
    return {
      ...state,
      order: action.payload,
    };
  }

  if (action.type === AdminActionTypes.SET_FILTER) {
    return {
      ...state,
      filterBy: action.payload,
    };
  }

  return state;
};

export { adminReducer };
