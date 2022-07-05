import {
  GridAction,
  GridThunkAction,
  GridActionTypes,
  GridState,
  Event,
  EditedEvent,
  CreatedEvent,
  User,
} from '../types';
import SchedulerService from '../../services/SchedulerService';

const schedulerService = new SchedulerService();

export const fetchEvents = (uid?: User['id']): GridThunkAction => {
  return async (dispatch) => {
    try {
      dispatch(eventsRequested());
      const events = await schedulerService.getEvents(uid);
      dispatch(eventsLoaded(events));
    } catch (error) {
      dispatch(eventsError(error as GridState['error']));
    }
  };
};

export const createEvent = (value: CreatedEvent): GridThunkAction => {
  return async (dispatch) => {
    try {
      const event: Event = await schedulerService.addEvent(value);

      dispatch({
        type: GridActionTypes.CREATE_EVENT,
        payload: event,
      });
    } catch (error) {
      dispatch(eventsError(error as GridState['error']));
    }
  };
};

export const editEvent = ({
  date,
  id,
  updates,
}: EditedEvent): GridThunkAction => {
  return async (dispatch) => {
    try {
      const newEvent = await schedulerService.editEvent(id, date, updates);

      dispatch({
        type: GridActionTypes.EDIT_EVENT,
        payload: newEvent,
      });
    } catch (error) {
      dispatch(eventsError(error as GridState['error']));
    }
  };
};

export const deleteEvent = (
  date: moment.Moment,
  id: User['id']
): GridThunkAction => {
  return async (dispatch) => {
    try {
      await schedulerService.removeEvent(id);

      dispatch({
        type: GridActionTypes.DELETE_EVENT,
        payload: date,
      });
    } catch (error) {
      dispatch(eventsError(error as GridState['error']));
    }
  };
};

export const setRowDate = (date: GridState['rowDate']): GridAction => {
  return {
    type: GridActionTypes.SET_ROW_DATE,
    payload: date,
  };
};

const eventsRequested = (): GridAction => {
  return {
    type: GridActionTypes.FETCH_EVENTS_REQUESTED,
  };
};

const eventsLoaded = (events: Event): GridAction => {
  return {
    type: GridActionTypes.FETCH_EVENTS_LOADED,
    payload: events,
  };
};

const eventsError = (error: GridState['error']): GridAction => {
  return {
    type: GridActionTypes.FETCH_EVENTS_ERROR,
    payload: error,
  };
};
