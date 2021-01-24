import moment from 'moment';
import 'moment/locale/ru';
import {
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
  SET_RADIO_BTN_VALUE,
  SET_NEXT_DAYS_NUM,
  SET_NEXT_EVENTS_NUM,
} from '../action-types';
import { RangeActionsType, IRangeState } from '../interfaces';

const initialState: IRangeState = {
  isRangeVisible: false,
  startOfRange: moment().clone().startOf('month'),
  endOfRange: moment().clone().endOf('month'),
  isLeftDatePickerVisible: false,
  isRightDatePickerVisible: false,
  radioBtnValue: 'schedule',
  nextDaysNum: '1',
  nextEventsNum: '1',
};

const rangeReducer = (
  state = initialState,
  action: RangeActionsType
): IRangeState => {
  if (action.type === TOGGLE_RANGE_VISIBLE) {
    return {
      ...state,
      isRangeVisible: !state.isRangeVisible,
    };
  }

  if (action.type === SET_START_OF_RANGE) {
    return {
      ...state,
      startOfRange: action.payload,
    };
  }

  if (action.type === SET_END_OF_RANGE) {
    return {
      ...state,
      endOfRange: action.payload,
    };
  }

  if (action.type === SET_LEFT_DATEPICKER_VISIBLE) {
    return {
      ...state,
      isLeftDatePickerVisible: action.payload,
    };
  }

  if (action.type === SET_RIGHT_DATEPICKER_VISIBLE) {
    return {
      ...state,
      isRightDatePickerVisible: action.payload,
    };
  }

  if (action.type === SET_RADIO_BTN_VALUE) {
    return {
      ...state,
      radioBtnValue: action.payload,
    };
  }

  if (action.type === SET_NEXT_DAYS_NUM) {
    return {
      ...state,
      nextDaysNum: action.payload,
    };
  }

  if (action.type === SET_NEXT_EVENTS_NUM) {
    return {
      ...state,
      nextEventsNum: action.payload,
    };
  }

  return state;
};

export { rangeReducer };
