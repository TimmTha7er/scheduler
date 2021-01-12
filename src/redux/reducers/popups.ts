import {
  SET_CREATE_POPUP_VISIBLE,
  SET_PREVIEW_POPUP_VISIBLE,
  SET_DELETE_POPUP_VISIBLE,
  SET_ALL_POPUPS_UNVISIBLE,
} from '../action-types';
import { PopupsActionTypes } from '../actions/popups';

interface IPopupsState {
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  isDeletePopupVisible: boolean;
}

const initialState: IPopupsState = {
  isCreatePopupVisible: false,
  isPreviewPopupVisible: false,
  isDeletePopupVisible: false,
};

const popupsReducer = (
  state = initialState,
  action: PopupsActionTypes
) => {
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

  if (action.type === SET_ALL_POPUPS_UNVISIBLE) {
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
