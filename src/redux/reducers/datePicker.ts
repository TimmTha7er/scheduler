import moment from 'moment';
import 'moment/locale/ru';
import {
  DatePickerState,
  DatePickerAction,
  DatePickerActionTypes,
} from '../types';

const initialState: DatePickerState = {
  date: moment(),
  isVisible: false,
};

const datePickerReducer = (
  state = initialState,
  action: DatePickerAction
): DatePickerState => {
  if (action.type === DatePickerActionTypes.SET_DATE) {
    return {
      ...state,
      date: action.payload,
    };
  }

  if (action.type === DatePickerActionTypes.SET_VISIBLE) {
    return {
      ...state,
      isVisible: action.payload,
    };
  }

  return state;
};

export { datePickerReducer };
