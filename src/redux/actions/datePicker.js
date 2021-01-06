export const initialDate = (date) => {
  return {
    type: 'INITIAL_DATE',
		payload: date,
  };
};

export const setDate = (date) => {
  return {
    type: 'SET_DATE',
    payload: date,
  };
};

export const setVisible = (isVisible) => {
  return {
    type: 'SET_VISIBLE',
		payload: isVisible,
  };
};

