import moment from 'moment';
import 'moment/locale/ru';

import { SET_DATE, SET_VISIBLE } from '../action-types';
import { DatePickerActionTypes } from '../actions/datePicker';

type IDatePickerState = {
  date: moment.Moment;
  isVisible: boolean;
};

const initialState: IDatePickerState = {
  date: moment(),
  isVisible: false,
};

const datePickerReducer = (
  state = initialState,
  action: DatePickerActionTypes
): IDatePickerState => {
  if (action.type === SET_DATE) {
    return {
      ...state,
      date: action.payload,
    };
  }

  if (action.type === SET_VISIBLE) {
    return {
      ...state,
      isVisible: action.payload,
    };
  }

  return state;
};

export default datePickerReducer;
