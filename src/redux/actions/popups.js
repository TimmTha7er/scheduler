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

export const setALLPopupsUnvisible = () => {
  return {
    type: 'SET_ALL_POPUPS_UNVISIBLE',
  };
};
