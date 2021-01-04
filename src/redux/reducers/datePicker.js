import moment from 'moment';
import 'moment/locale/ru';

const initialState = {
  date: moment(),
  isVisible: false,
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
  events: {},
};

const datePickerReducer = (state = initialState, action) => {
  // DATE PICKER
  // ----------------
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
  // ----------------
  // DATE PICKER

  // GRID NAV
  // ----------------
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
      date: nextDay,
    };
  }

  if (action.type === 'SET_TODAY') {
    const today = moment();

    return {
      ...state,
      date: today,
    };
  }
  // ----------------
  // GRID NAV

  // DAY GRID
  // ----------------
  if (action.type === 'SET_CREATE_POPUP_VISIBLE') {
    return {
      ...state,
      isCreatePopupVisible: action.payload,
    };
  }

  if (action.type === 'SET_PREVIEW_POPUP_VISIBLE') {
    return {
      ...state,
      isPreviewPopupVisible: action.payload,
    };
  }

  if (action.type === 'SET_DELETE_POPUP_VISIBLE') {
    return {
      ...state,
      isDeletePopupVisible: action.payload,
    };
  }

  if (action.type === 'CREATE_EVENT') {
    const newEvent = {
      [state.date]: {
        title: action.payload.title,
        descr: action.payload.descr,
      },
    };
    return {
      ...state,
      events: { ...state.events, ...newEvent },
    };
  }

  if (action.type === 'DELETE_EVENT') {
    console.log('DELETE_EVENT', action.payload);
    const newEvents = { ...state.events };
    delete newEvents[action.payload];
    return {
      ...state,
      events: { ...newEvents },
    };
  }

  // ----------------
  // DAY GRID

  return state;
};

export default datePickerReducer;
