
const initialState = {
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
  // isEditPopupVisible: false,
};

const popupsReducer = (state = initialState, action) => {
  if (action.type === 'SET_CREATE_POPUP_VISIBLE') {
    return {
      ...state,
      isCreatePopupVisible: action.payload,
    };
  }

  if (action.type === 'SET_PREVIEW_POPUP_VISIBLE') {
    return {
      ...state,
      isPreviewPopupVisible: action.payload,
    };
  }

  if (action.type === 'SET_DELETE_POPUP_VISIBLE') {
    return {
      ...state,
      isDeletePopupVisible: action.payload,
    };
  }

  // if (action.type === 'SET_EDIT_POPUP_VISIBLE') {
  //   return {
  //     ...state,
  //     isEditPopupVisible: action.payload,
  //   };
  // }

  return state;
};

export default popupsReducer;
