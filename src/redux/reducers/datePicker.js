import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
  date: moment(),
  isVisible: false,
};

const datePickerReducer = (state = initialState, action) => {
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

  if (action.type === 'SET_PREV_DAY') {
    const prevDay = state.date.clone().subtract(1, 'day');

    return {
      ...state,
      date: prevDay,
    };
  }

  if (action.type === 'SET_NEXT_DAY') {
    const nextDay = state.date.clone().add(1, 'day');

    return {
      ...state,
      date:nextDay,
    };
  }
  
  if (action.type === 'SET_TODAY') {
    const today = moment();

    return {
      ...state,
      date: today,
    };
  }

  return state;
};

export default datePickerReducer;
