import { PopupsAction, PopupsActionTypes, PopupsState } from '../types';

export const setCreatePopupVisible = (
  value: PopupsState['isCreatePopupVisible']
): PopupsAction => {
  return {
    type: PopupsActionTypes.SET_CREATE_POPUP_VISIBLE,
    payload: value,
  };
};

export const setPreviewPopupVisible = (
  value: PopupsState['isPreviewPopupVisible']
): PopupsAction => {
  return {
    type: PopupsActionTypes.SET_PREVIEW_POPUP_VISIBLE,
    payload: value,
  };
};

export const setDeletePopupVisible = (
  value: PopupsState['isDeletePopupVisible']
): PopupsAction => {
  return {
    type: PopupsActionTypes.SET_DELETE_POPUP_VISIBLE,
    payload: value,
  };
};

export const setEditPopupVisible = (
  value: PopupsState['isEditPopupVisible']
): PopupsAction => {
  return {
    type: PopupsActionTypes.SET_EDIT_POPUP_VISIBLE,
    payload: value,
  };
};

export const setALLPopupsUnvisible = (): PopupsAction => {
  return {
    type: PopupsActionTypes.SET_ALL_POPUPS_UNVISIBLE,
  };
};
