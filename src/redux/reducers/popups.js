const initialState = {
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
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

  if (action.type === 'SET_ALL_POPUPS_UNVISIBLE') {
    return {
      ...state,
      isCreatePopupVisible: false,
      isPreviewPopupVisible: false,
      isDeletePopupVisible: false,
    };
  }

  return state;
};

export default popupsReducer;
