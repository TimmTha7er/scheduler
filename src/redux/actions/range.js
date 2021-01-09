export const toggleRangeVisible = () => {
  return {
    type: 'TOGGLE_RANGE_VISIBLE',
  };
};


export const setStartOFRange = (date) => {
  return {
    type: 'SET_START_OF_RANGE',
    payload: date,
  };
};

export const setEndOFRange = (date) => {
  return {
    type: 'SET_END_OF_RANGE',
    payload: date,
  };
};

export const setLeftDatePickerVisible = (date) => {
  return {
    type: 'SET_LEFT_DATEPICKER_VISIBLE',
    payload: date,
  };
};

export const setRightDatePickerVisible = (date) => {
  return {
    type: 'SET_RIGHT_DATEPICKER_VISIBLE',
    payload: date,
  };
};


