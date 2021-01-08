const initialState = {
  rowDate: null,
  events: {
    'Wed Jan 06 2021 00:00:00 GMT+0300': { title: '00 00  06', descr: '06 06' },
    'Wed Jan 06 2021 06:00:00 GMT+0300': { title: '1', descr: '1' },
    'Wed Jan 06 2021 07:00:00 GMT+0300': { title: '2', descr: '2' },
    'Wed Jan 06 2021 23:00:00 GMT+0300': { title: '23 00  06', descr: '06 06' },

    'Thu Jan 07 2021 00:00:00 GMT+0300': { title: '00 00  07', descr: '07 07' },
    'Thu Jan 07 2021 01:00:00 GMT+0300': { title: 'Без названия', descr: '' },
    'Thu Jan 07 2021 03:00:00 GMT+0300': {
      title: 'авы ав ыа вы  аы  а ыва ',
      descr: '1',
    },
    'Thu Jan 07 2021 04:00:00 GMT+0300': { title: '2', descr: '2' },
    'Thu Jan 07 2021 05:00:00 GMT+0300': { title: '3', descr: '3' },
    'Thu Jan 07 2021 06:00:00 GMT+0300': { title: '4', descr: '4' },
    'Thu Jan 07 2021 07:00:00 GMT+0300': { title: '5', descr: '5' },
    'Thu Jan 07 2021 08:00:00 GMT+0300': { title: '6', descr: '6' },
    'Thu Jan 07 2021 23:00:00 GMT+0300': { title: '23 00  07', descr: '07 07' },
  },
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
