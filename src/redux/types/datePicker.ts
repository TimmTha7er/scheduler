// action types
export enum DatePickerActionTypes {
  SET_DATE = 'date-picker/SET_DATE',
  SET_VISIBLE = 'date-picker/SET_VISIBLE',
}

// reducer
export interface DatePickerState {
  date: moment.Moment;
  isVisible: boolean;
}

// actions
interface SetDate {
  type: typeof DatePickerActionTypes.SET_DATE;
  payload: DatePickerState['date'];
}

interface SetVISIBLE {
  type: typeof DatePickerActionTypes.SET_VISIBLE;
  payload: DatePickerState['isVisible'];
}

export type DatePickerAction = SetVISIBLE | SetDate;
