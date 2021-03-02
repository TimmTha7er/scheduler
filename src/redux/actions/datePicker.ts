import {
  DatePickerActionTypes,
  DatePickerAction,
  DatePickerState,
} from '../types';

export const setDate = (date: DatePickerState['date']): DatePickerAction => {
  return {
    type: DatePickerActionTypes.SET_DATE,
    payload: date,
  };
};

export const setVisible = (
  value: DatePickerState['isVisible']
): DatePickerAction => {
  return {
    type: DatePickerActionTypes.SET_VISIBLE,
    payload: value,
  };
};
