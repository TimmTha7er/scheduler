import { GridState, GridAction, GridActionTypes, Event } from '../types';

const initialState: GridState = {
  rowDate: null,
  events: {},
  loading: true,
  error: null,
};

const gridReducer = (state = initialState, action: GridAction): GridState => {
  if (action.type === GridActionTypes.FETCH_EVENTS_REQUESTED) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === GridActionTypes.FETCH_EVENTS_LOADED) {
    return {
      ...state,
      events: action.payload,
      loading: false,
      error: null,
    };
  }

  if (action.type === GridActionTypes.FETCH_EVENTS_ERROR) {
    return {
      ...state,
      events: {},
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === GridActionTypes.SET_ROW_DATE) {
    return {
      ...state,
      rowDate: action.payload,
    };
  }

  if (action.type === GridActionTypes.CREATE_EVENT) {
    return {
      ...state,
      events: { ...state.events, ...action.payload },
    };
  }

  if (action.type === GridActionTypes.EDIT_EVENT) {
    return {
      ...state,
      events: { ...state.events, ...action.payload },
    };
  }

  if (action.type === GridActionTypes.DELETE_EVENT) {
    const newEvents: Event = { ...state.events };
    const time: string = action.payload!.toString();
    delete newEvents[time];

    return {
      ...state,
      events: { ...newEvents },
      rowDate: null,
    };
  }

  return state;
};

export { gridReducer };
