import { PopupsState, PopupsAction, PopupsActionTypes } from '../types';

const initialState: PopupsState = {
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
  isEditPopupVisible: false,
};

const popupsReducer = (
  state = initialState,
  action: PopupsAction
): PopupsState => {
  if (action.type === PopupsActionTypes.SET_CREATE_POPUP_VISIBLE) {
    return {
      ...state,
      isCreatePopupVisible: action.payload,
    };
  }

  if (action.type === PopupsActionTypes.SET_PREVIEW_POPUP_VISIBLE) {
    return {
      ...state,
      isPreviewPopupVisible: action.payload,
    };
  }

  if (action.type === PopupsActionTypes.SET_DELETE_POPUP_VISIBLE) {
    return {
      ...state,
      isDeletePopupVisible: action.payload,
    };
  }

  if (action.type === PopupsActionTypes.SET_EDIT_POPUP_VISIBLE) {
    return {
      ...state,
      isEditPopupVisible: action.payload,
    };
  }

  if (action.type === PopupsActionTypes.SET_ALL_POPUPS_UNVISIBLE) {
    return {
      ...state,
      isCreatePopupVisible: false,
      isPreviewPopupVisible: false,
      isDeletePopupVisible: false,
      isEditPopupVisible: false,
    };
  }

  return state;
};

export { popupsReducer };
