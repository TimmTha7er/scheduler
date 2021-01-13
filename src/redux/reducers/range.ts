import moment from 'moment';
import 'moment/locale/ru';
import {
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
} from '../action-types';
import { RangeActionsType } from '../actions/range';

interface IRangeState {
  isRangeVisible: boolean;
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  isLeftDatePickerVisible: boolean;
  isRightDatePickerVisible: boolean;
}

const initialState: IRangeState = {
  isRangeVisible: false,
  startOfRange: moment().clone().startOf('week'),
  endOfRange: moment().clone().endOf('week'),
  isLeftDatePickerVisible: false,
  isRightDatePickerVisible: false,
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

  return state;
};

export { rangeReducer };
