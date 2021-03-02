// action types
export enum PopupsActionTypes {
  SET_CREATE_POPUP_VISIBLE = 'popups/SET_CREATE_POPUP_VISIBLE',
  SET_PREVIEW_POPUP_VISIBLE = 'popups/SET_PREVIEW_POPUP_VISIBLE',
  SET_EDIT_POPUP_VISIBLE = 'popups/SET_EDIT_POPUP_VISIBLE',
  SET_DELETE_POPUP_VISIBLE = 'popups/SET_DELETE_POPUP_VISIBLE',
  SET_ALL_POPUPS_UNVISIBLE = 'popups/SET_ALL_POPUPS_UNVISIBLE',
}

// reducer
export interface PopupsState {
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  isDeletePopupVisible: boolean;
  isEditPopupVisible: boolean;
}

// actions
interface SetCreatePopupVisible {
  type: typeof PopupsActionTypes.SET_CREATE_POPUP_VISIBLE;
  payload: PopupsState['isCreatePopupVisible'];
}

interface SetPreviewPopupVisible {
  type: typeof PopupsActionTypes.SET_PREVIEW_POPUP_VISIBLE;
  payload: PopupsState['isPreviewPopupVisible'];
}

interface SetDeletePopupVisible {
  type: typeof PopupsActionTypes.SET_DELETE_POPUP_VISIBLE;
  payload: PopupsState['isDeletePopupVisible'];
}

interface SetEditPopupVisible {
  type: typeof PopupsActionTypes.SET_EDIT_POPUP_VISIBLE;
  payload: PopupsState['isEditPopupVisible'];
}

interface SetAllPopupsUnvisible {
  type: typeof PopupsActionTypes.SET_ALL_POPUPS_UNVISIBLE;
}

export type PopupsAction =
  | SetCreatePopupVisible
  | SetPreviewPopupVisible
  | SetDeletePopupVisible
  | SetEditPopupVisible
  | SetAllPopupsUnvisible;
