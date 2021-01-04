// date picker
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

// grid nav
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

// day grid
export const setCreatePopupVisible = (value) => {
  return {
    type: 'SET_CREATE_POPUP_VISIBLE',
		payload: value,
  };
};

export const setPreviewPopupVisible = (value) => {
  return {
    type: 'SET_PREVIEW_POPUP_VISIBLE',
		payload: value,
  };
};

export const setDeletePopupVisible = (value) => {
  return {
    type: 'SET_DELETE_POPUP_VISIBLE',
		payload: value,
  };
};

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