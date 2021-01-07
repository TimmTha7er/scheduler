export const initialRange = (date) => {
  return {
    type: 'INITIAL_RANGE',
		payload: date,
  };
};

export const toggleRangeVisible = () => {
  return {
    type: 'TOGGLE_RANGE_VISIBLE',
  };
};


export const setRange = (date) => {
  return {
    type: 'SET_RANGE',
    payload: date,
  };
};


