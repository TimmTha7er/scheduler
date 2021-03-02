import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

// action types
export enum GridActionTypes {
  CREATE_EVENT = 'grid/CREATE_EVENT',
  DELETE_EVENT = 'grid/DELETE_EVENT',
  EDIT_EVENT = 'grid/EDIT_EVENT',
  SET_ROW_DATE = 'grid/SET_ROW_DATE',
  FETCH_EVENTS_REQUESTED = 'grid/FETCH_EVENTS_REQUESTED',
  FETCH_EVENTS_LOADED = 'grid/FETCH_EVENTS_LOADED',
  FETCH_EVENTS_ERROR = 'grid/FETCH_EVENTS_ERROR',
}

// reducer
export interface GridState {
  rowDate: moment.Moment | null;
  events: Event;
  loading: boolean;
  error: null | {};
}

// actions
export interface CreatedEvent {
  title: string;
  descr: string;
  time: string;
}

export interface EditedEvent {
  date: string;
  id: string;
  updates: {
    title: string;
    descr: string;
  };
}

export interface Event {
  [date: string]: {
    title: string;
    descr: string;
    id: string;
  };
}

interface CreateEvent {
  type: typeof GridActionTypes.CREATE_EVENT;
  payload: Event;
}

interface EditEvent {
  type: typeof GridActionTypes.EDIT_EVENT;
  payload: Event;
}

interface DeleteEvent {
  type: typeof GridActionTypes.DELETE_EVENT;
  payload: moment.Moment;
}

interface SetRowDate {
  type: typeof GridActionTypes.SET_ROW_DATE;
  payload: GridState['rowDate'];
}

interface EventsRequested {
  type: typeof GridActionTypes.FETCH_EVENTS_REQUESTED;
}

interface EventsLoaded {
  type: typeof GridActionTypes.FETCH_EVENTS_LOADED;
  payload: GridState['events'];
}

interface EventsEror {
  type: typeof GridActionTypes.FETCH_EVENTS_ERROR;
  payload: GridState['error'];
}

export type GridAction =
  | CreateEvent
  | DeleteEvent
  | EditEvent
  | SetRowDate
  | EventsRequested
  | EventsLoaded
  | EventsEror;

export type GridThunkAction = ThunkAction<void, RootState, null, GridAction>;
