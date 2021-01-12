import { SET_DATE, SET_VISIBLE } from '../action-types';

interface ISetDate {
  type: typeof SET_DATE;
  payload: moment.Moment;
}

interface ISetVISIBLE {
  type: typeof SET_VISIBLE;
  payload: boolean;
}

export type DatePickerActionTypes = ISetVISIBLE | ISetDate;

export const setDate = (date: moment.Moment): DatePickerActionTypes => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const setVisible = (value: boolean): DatePickerActionTypes => {
  return {
    type: SET_VISIBLE,
    payload: value,
  };
};
