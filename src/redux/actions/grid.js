export const createEvent = (value) => {
  return {
    type: 'CREATE_EVENT',
		payload: value,
  };
};

export const deleteEvent = (date) => {
  return {
    type: 'DELETE_EVENT',
		payload: date,
  };
};

export const setRowDate = (date) => {
  return {
    type: 'SET_ROW_DATE',
		payload: date,
  };
};