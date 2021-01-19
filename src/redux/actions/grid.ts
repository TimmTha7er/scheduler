import {
  CREATE_EVENT,
  DELETE_EVENT,
  SET_ROW_DATE,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_LOADED,
  FETCH_EVENTS_ERROR,
} from '../action-types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

import SchedulerStoreService from '../../services/SchedulerStoreService';

const schedulerStoreService = new SchedulerStoreService();

export interface IEvent {
  title: string;
  descr: string;
  id?: string;
  time?: string;
}

export interface IEventList {
  [name: string]: IEvent;
}

interface ICreateEvent {
  type: typeof CREATE_EVENT;
  payload: any;
}
// export const createEvent = (value: IEvent): GridActionsType => {
//   return {
//     type: CREATE_EVENT,
//     payload: value,
//   };
// };
export const createEvent = (
  value: IEvent
): ThunkAction<void, RootState, null, GridActionsType> => {
  return async (dispatch) => {
    try {
      const event = await schedulerStoreService.addEvent(value);

      dispatch({
        type: CREATE_EVENT,
        payload: event,
      });
    } catch (error) {
      dispatch(eventsError(error));
    }
  };
};

interface IDeleteEvent {
  type: typeof DELETE_EVENT;
  payload: moment.Moment;
}
export const deleteEvent = (date: moment.Moment): GridActionsType => {
  return {
    type: DELETE_EVENT,
    payload: date,
  };
};

interface ISetRowDate {
  type: typeof SET_ROW_DATE;
  payload: moment.Moment | null;
}
export const setRowDate = (date: moment.Moment | null): GridActionsType => {
  return {
    type: SET_ROW_DATE,
    payload: date,
  };
};

interface IEventsRequested {
  type: typeof FETCH_EVENTS_REQUESTED;
}
const eventsRequested = (): GridActionsType => {
  return {
    type: FETCH_EVENTS_REQUESTED,
  };
};

interface IEventsLoaded {
  type: typeof FETCH_EVENTS_LOADED;
  payload: any;
}
const eventsLoaded = (events: IEventList[]): GridActionsType => {
  return {
    type: FETCH_EVENTS_LOADED,
    payload: events,
  };
};

interface IEventsEror {
  type: typeof FETCH_EVENTS_ERROR;
  payload: {};
}
const eventsError = (error: {}): GridActionsType => {
  return {
    type: FETCH_EVENTS_ERROR,
    payload: error,
  };
};

export const fetchEvents = (): ThunkAction<
  void,
  RootState,
  null,
  GridActionsType
> => {
  return async (dispatch) => {
    try {
      dispatch(eventsRequested());
      const events = await schedulerStoreService.getEvents();
      dispatch(eventsLoaded(events));
    } catch (error) {
      dispatch(eventsError(error));
    }
  };
};

export type GridActionsType =
  | ICreateEvent
  | IDeleteEvent
  | ISetRowDate
  | IEventsRequested
  | IEventsLoaded
  | IEventsEror;
