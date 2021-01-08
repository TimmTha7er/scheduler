import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
  isRangeVisible: false,
  startOfRange: moment().clone().startOf('week'),
  endOfRange: moment().clone().endOf('week'),
  // isEditPopupVisible: false,
  isLeftDatePickerVisible: false,
  isRightDatePickerVisible: false,
};

const rangeReducer = (state = initialState, action) => {
  if (action.type === 'TOGGLE_RANGE_VISIBLE') {
    return {
      ...state,
      isRangeVisible: !state.isRangeVisible,
    };
  }

  if (action.type === 'INITIAL_RAGE') {
    return {
      ...state,
      // startDate: action.payload,
      // endDate: action.payload,
    };
  }

  if (action.type === 'SET_START_OF_RANGE') {
    return {
      ...state,
      startOfRange: action.payload,
    };
  }

  if (action.type === 'SET_END_OF_RANGE') {
    return {
      ...state,
      endOfRange: action.payload,
    };
  }

  if (action.type === 'SET_LEFT_DATEPICKER_VISIBLE') {
    return {
      ...state,
      isLeftDatePickerVisible: action.payload,
    };
  }

  if (action.type === 'SET_RIGHT_DATEPICKER_VISIBLE') {
    return {
      ...state,
      isRightDatePickerVisible: action.payload,
    };
  }

  return state;
};

export default rangeReducer;
