import {
  DELETE_EVENT,
  CREATE_EVENT,
  EDIT_EVENT,
  SET_ROW_DATE,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_LOADED,
  FETCH_EVENTS_ERROR,
} from '../action-types';
import { GridActionsType, IEvent, IGridState } from '../interfaces';

const initialState: IGridState = {
  rowDate: null,
  events: {},
  loading: true,
  error: null,
};

const gridReducer = (
  state = initialState,
  action: GridActionsType
): IGridState => {
  if (action.type === FETCH_EVENTS_REQUESTED) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCH_EVENTS_LOADED) {
    return {
      ...state,
      events: action.payload,
      loading: false,
      error: null,
    };
  }

  if (action.type === FETCH_EVENTS_ERROR) {
    return {
      ...state,
      events: {},
      loading: false,
      error: action.payload,
    };
  }

  if (action.type === SET_ROW_DATE) {
    return {
      ...state,
      rowDate: action.payload,
    };
  }

  if (action.type === CREATE_EVENT) {
    return {
      ...state,
      events: { ...state.events, ...action.payload },
    };
  }

  if (action.type === EDIT_EVENT) {
    return {
      ...state,
      events: { ...state.events, ...action.payload },
    };
  }

  if (action.type === DELETE_EVENT) {
    const newEvents: IEvent = { ...state.events };
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
