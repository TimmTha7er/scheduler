import {
  SET_CREATE_POPUP_VISIBLE,
  SET_PREVIEW_POPUP_VISIBLE,
  SET_EDIT_POPUP_VISIBLE,
  SET_DELETE_POPUP_VISIBLE,
  SET_ALL_POPUPS_UNVISIBLE,
} from '../action-types';
import { PopupsActionTypes } from '../interfaces';

export const setCreatePopupVisible = (value: boolean): PopupsActionTypes => {
  return {
    type: SET_CREATE_POPUP_VISIBLE,
    payload: value,
  };
};

export const setPreviewPopupVisible = (value: boolean): PopupsActionTypes => {
  return {
    type: SET_PREVIEW_POPUP_VISIBLE,
    payload: value,
  };
};

export const setDeletePopupVisible = (value: boolean): PopupsActionTypes => {
  return {
    type: SET_DELETE_POPUP_VISIBLE,
    payload: value,
  };
};

export const setEditPopupVisible = (value: boolean): PopupsActionTypes => {
  return {
    type: SET_EDIT_POPUP_VISIBLE,
    payload: value,
  };
};

export const setALLPopupsUnvisible = (): PopupsActionTypes => {
  return {
    type: SET_ALL_POPUPS_UNVISIBLE,
  };
};
