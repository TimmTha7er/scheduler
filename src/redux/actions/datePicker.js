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

export const setPrevDay = () => {
  return {
    type: 'SET_PREV_DAY'
  };
};

export const setNextDay = () => {
  return {
    type: 'SET_NEXT_DAY'
  };
};

export const setToday = () => {
  return {
    type: 'SET_TODAY'
  };
};