import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
  isRangeVisible: false,
  startOfRange: moment().clone().subtract(1, 'week'),
  endOfRange: moment().clone().add(1, 'week'),
  // isEditPopupVisible: false,
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

  if (action.type === 'SET_RANGE') {
    return {
      ...state,
      startDate: action.payload.start,
      endDate: action.payload.end,
    };
  }

  return state;
};

export default rangeReducer;
