import moment from 'moment';
import 'moment/locale/ru';
import { RangeState, RangeAction, RangeActionTypes } from '../types';

const initialState: RangeState = {
  startOfRange: moment().clone().startOf('month'),
  endOfRange: moment().clone().endOf('month'),
  isLeftDatePickerVisible: false,
  isRightDatePickerVisible: false,
  nextDaysNum: '1',
  nextEventsNum: '1',
  selectValue: 'суток',
};

const rangeReducer = (
  state = initialState,
  action: RangeAction
): RangeState => {
  if (action.type === RangeActionTypes.SET_START_OF_RANGE) {
    return {
      ...state,
      startOfRange: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_END_OF_RANGE) {
    return {
      ...state,
      endOfRange: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_LEFT_DATEPICKER_VISIBLE) {
    return {
      ...state,
      isLeftDatePickerVisible: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_RIGHT_DATEPICKER_VISIBLE) {
    return {
      ...state,
      isRightDatePickerVisible: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_NEXT_DAYS_NUM) {
    return {
      ...state,
      nextDaysNum: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_NEXT_EVENTS_NUM) {
    return {
      ...state,
      nextEventsNum: action.payload,
    };
  }

  if (action.type === RangeActionTypes.SET_SELECT_VALUE) {
    return {
      ...state,
      selectValue: action.payload,
    };
  }

  return state;
};

export { rangeReducer };
