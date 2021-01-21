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
  IEditedEvent,
  ICreatedEvent,
  GridActionsType,
  GridThunkActionType,
} from '../interfaces';
import SchedulerService from '../../services/SchedulerService';

const schedulerService = new SchedulerService();

export const fetchEvents = (): GridThunkActionType => {
  return async (dispatch) => {
    try {
      dispatch(eventsRequested());
      const events = await schedulerService.getEvents();
      dispatch(eventsLoaded(events));
    } catch (error) {
      dispatch(eventsError(error));
    }
  };
};

export const createEvent = (value: ICreatedEvent): GridThunkActionType => {
  return async (dispatch) => {
    try {
      const event: IEvent = await schedulerService.addEvent(value);

      dispatch({
        type: CREATE_EVENT,
        payload: event,
      });
    } catch (error) {
      dispatch(eventsError(error));
    }
  };
};

export const editEvent = ({
  date,
  id,
  updates,
}: IEditedEvent): GridThunkActionType => {
  return async (dispatch) => {
    try {
      await schedulerService.editEvent(id, updates);

      const { title, descr } = updates;
      const newEvent: IEvent = {
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
      await schedulerService.removeEvent(id);

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

const eventsLoaded = (events: IEvent): GridActionsType => {
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
