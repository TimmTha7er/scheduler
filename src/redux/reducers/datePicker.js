import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
  date: moment(),
  isVisible: false,
};

const datePickerReducer = (state = initialState, action) => {
  // if (action.type === 'INITIAL_DATE') {
  //   return {
  //     ...state,
  //     date: action.payload,
  //   };
  // }

  if (action.type === 'SET_DATE') {
    return {
      ...state,
      date: action.payload,
    };
  }

  if (action.type === 'SET_VISIBLE') {
    return {
      ...state,
      isVisible: action.payload,
    };
  }

  return state;
};

export default datePickerReducer;
