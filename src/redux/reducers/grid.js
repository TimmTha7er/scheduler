const initialState = {
  rowDate: null,
  events: {},
};

const datePickerReducer = (state = initialState, action) => {
  if (action.type === 'SET_ROW_DATE') {
    return {
      ...state,
      rowDate: action.payload,
    };
  }

  if (action.type === 'CREATE_EVENT') {
    const newEvent = {
      [state.rowDate]: {
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
    const newEvents = { ...state.events };
    delete newEvents[action.payload];

    return {
      ...state,
      events: { ...newEvents },
    };
  }

  return state;
};

export default datePickerReducer;
