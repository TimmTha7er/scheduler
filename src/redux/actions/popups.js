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

// export const setEditPopupVisible = (value) => {
//   return {
//     type: 'SET_EDIT_POPUP_VISIBLE',
// 		payload: value,
//   };
// };