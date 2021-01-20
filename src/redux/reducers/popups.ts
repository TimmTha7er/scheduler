import {
  SET_CREATE_POPUP_VISIBLE,
  SET_PREVIEW_POPUP_VISIBLE,
  SET_DELETE_POPUP_VISIBLE,
  SET_ALL_POPUPS_UNVISIBLE,
  SET_EDIT_POPUP_VISIBLE,
} from '../action-types';
import { PopupsActionTypes, IPopupsState } from '../interfaces';

const initialState: IPopupsState = {
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
  isEditPopupVisible: false,
};

const popupsReducer = (
  state = initialState,
  action: PopupsActionTypes
): IPopupsState => {
  if (action.type === SET_CREATE_POPUP_VISIBLE) {
    return {
      ...state,
      isCreatePopupVisible: action.payload,
    };
  }

  if (action.type === SET_PREVIEW_POPUP_VISIBLE) {
    return {
      ...state,
      isPreviewPopupVisible: action.payload,
    };
  }

  if (action.type === SET_DELETE_POPUP_VISIBLE) {
    return {
      ...state,
      isDeletePopupVisible: action.payload,
    };
  }

  if (action.type === SET_EDIT_POPUP_VISIBLE) {
    return {
      ...state,
      isEditPopupVisible: action.payload,
    };
  }

  if (action.type === SET_ALL_POPUPS_UNVISIBLE) {
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
