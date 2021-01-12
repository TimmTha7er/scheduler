import { CREATE_EVENT, DELETE_EVENT, SET_ROW_DATE } from '../action-types';

export interface IEvent {
  title: string;
  descr: string;
}

export interface IEventList {
  [name: string]: IEvent;
}

interface ICreateEvent {
  type: typeof CREATE_EVENT;
  payload: IEvent;
}
export const createEvent = (value: IEvent): GridActionsType => {
  return {
    type: CREATE_EVENT,
    payload: value,
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

export type GridActionsType = ICreateEvent | IDeleteEvent | ISetRowDate;
