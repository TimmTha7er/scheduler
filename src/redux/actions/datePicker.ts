import { SET_DATE, SET_VISIBLE } from '../action-types';
import { DatePickerActionTypes } from '../interfaces';

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
