import {
  CREATE_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  SET_ROW_DATE,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_LOADED,
  FETCH_EVENTS_ERROR,
} from '../action-types';
import {
  IEvent,
  GridActionsType,
  IEventList,
  GridThunkActionType,
} from '../interfaces';
import SchedulerStoreService from '../../services/SchedulerStoreService';

const schedulerStoreService = new SchedulerStoreService();

export const fetchEvents = (): GridThunkActionType => {
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

export const createEvent = (value: IEvent): GridThunkActionType => {
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

export const editEvent = (
  date: string,
  id: string,
  updates: {
    title: string;
    descr: string;
  }
): GridThunkActionType => {
  return async (dispatch) => {
    try {
      await schedulerStoreService.editEvent(id, updates);

      const { title, descr } = updates;
      const newEvent: any = {
        [date]: {
          title,
          descr,
          id,
        },
      };

      dispatch({
        type: EDIT_EVENT,
        payload: newEvent,
      });
    } catch (error) {
      console.log(error);

      dispatch(eventsError(error));
    }
  };
};

export const deleteEvent = (
  date: moment.Moment,
  id: string
): GridThunkActionType => {
  return async (dispatch) => {
    try {
      await schedulerStoreService.removeEvent(id);

      dispatch({
        type: DELETE_EVENT,
        payload: date,
      });
    } catch (error) {
      dispatch(eventsError(error));
    }
  };
};

export const setRowDate = (date: moment.Moment | null): GridActionsType => {
  return {
    type: SET_ROW_DATE,
    payload: date,
  };
};

const eventsRequested = (): GridActionsType => {
  return {
    type: FETCH_EVENTS_REQUESTED,
  };
};

const eventsLoaded = (events: IEventList[]): GridActionsType => {
  return {
    type: FETCH_EVENTS_LOADED,
    payload: events,
  };
};

const eventsError = (error: {}): GridActionsType => {
  return {
    type: FETCH_EVENTS_ERROR,
    payload: error,
  };
};
