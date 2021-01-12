import {
  SET_CREATE_POPUP_VISIBLE,
  SET_PREVIEW_POPUP_VISIBLE,
  SET_DELETE_POPUP_VISIBLE,
  SET_ALL_POPUPS_UNVISIBLE,
} from '../action-types';

interface ISetCreatePopupVisible {
  type: typeof SET_CREATE_POPUP_VISIBLE;
  payload: boolean;
}

interface ISetPreviewPopupVisible {
  type: typeof SET_PREVIEW_POPUP_VISIBLE;
  payload: boolean;
}

interface ISetDeletePopupVisible {
  type: typeof SET_DELETE_POPUP_VISIBLE;
  payload: boolean;
}

interface ISetAllPopupsUnvisible {
  type: typeof SET_ALL_POPUPS_UNVISIBLE;
  payload?: never;
}

export type PopupsActionTypes =
  | ISetCreatePopupVisible
  | ISetPreviewPopupVisible
  | ISetDeletePopupVisible
  | ISetAllPopupsUnvisible;

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

export const setALLPopupsUnvisible = (): PopupsActionTypes => {
  return {
    type: SET_ALL_POPUPS_UNVISIBLE,
  };
};
