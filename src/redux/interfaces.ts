import {
  SET_DATE,
  SET_VISIBLE,
  CREATE_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  SET_ROW_DATE,
  FETCH_EVENTS_REQUESTED,
  FETCH_EVENTS_LOADED,
  FETCH_EVENTS_ERROR,
  SET_CREATE_POPUP_VISIBLE,
  SET_PREVIEW_POPUP_VISIBLE,
  SET_EDIT_POPUP_VISIBLE,
  SET_DELETE_POPUP_VISIBLE,
  SET_ALL_POPUPS_UNVISIBLE,
  // TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
  // SET_RADIO_BTN_VALUE,
  SET_NEXT_DAYS_NUM,
  SET_NEXT_EVENTS_NUM,
  SET_SELECT_VALUE,
  SET_USER,
  SIGN_OUT,
  SET_LOADING,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
  FETCH_USERS_REQUESTED,
  FETCH_USERS_LOADED,
  FETCH_USERS_ERROR,
} from './action-types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

// ----------------------------------------------
//		date picker
// ----------------------------------------------
// reducer
export interface IDatePickerState {
  date: moment.Moment;
  isVisible: boolean;
}

// actions
export interface ISetDate {
  type: typeof SET_DATE;
  payload: moment.Moment;
}
export interface ISetVISIBLE {
  type: typeof SET_VISIBLE;
  payload: boolean;
}
export type DatePickerActionTypes = ISetVISIBLE | ISetDate;

// ----------------------------------------------
//		grid
// ----------------------------------------------
// reducer
export interface IGridState {
  rowDate: moment.Moment | null;
  events: IEvent;
  loading: boolean;
  error: null | {};
}

// actions
export interface ICreatedEvent {
  title: string;
  descr: string;
  time: string;
}

export interface IEditedEvent {
  date: string;
  id: string;
  updates: {
    title: string;
    descr: string;
  };
}

export interface IEvent {
  [date: string]: {
    title: string;
    descr: string;
    id: string;
  };
}

export interface ICreateEvent {
  type: typeof CREATE_EVENT;
  payload: IEvent;
}

export interface IEditEvent {
  type: typeof EDIT_EVENT;
  payload: IEvent;
}

interface IDeleteEvent {
  type: typeof DELETE_EVENT;
  payload: moment.Moment;
}

interface ISetRowDate {
  type: typeof SET_ROW_DATE;
  payload: moment.Moment | null;
}

interface IEventsRequested {
  type: typeof FETCH_EVENTS_REQUESTED;
}

interface IEventsLoaded {
  type: typeof FETCH_EVENTS_LOADED;
  payload: IEvent;
}

interface IEventsEror {
  type: typeof FETCH_EVENTS_ERROR;
  payload: {};
}

export type GridActionsType =
  | ICreateEvent
  | IDeleteEvent
  | IEditEvent
  | ISetRowDate
  | IEventsRequested
  | IEventsLoaded
  | IEventsEror;

export type GridThunkActionType = ThunkAction<
  void,
  RootState,
  null,
  GridActionsType
>;

// ----------------------------------------------
//		popups
// ----------------------------------------------
// reducer
export interface IPopupsState {
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  isDeletePopupVisible: boolean;
  isEditPopupVisible: boolean;
}

// actions
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

interface ISetEditPopupVisible {
  type: typeof SET_EDIT_POPUP_VISIBLE;
  payload: boolean;
}

interface ISetAllPopupsUnvisible {
  type: typeof SET_ALL_POPUPS_UNVISIBLE;
  // payload?: never;
}

export type PopupsActionTypes =
  | ISetCreatePopupVisible
  | ISetPreviewPopupVisible
  | ISetDeletePopupVisible
  | ISetEditPopupVisible
  | ISetAllPopupsUnvisible;

// ----------------------------------------------
//		range
// ----------------------------------------------
// reducer
export interface IRangeState {
  // isRangeVisible: boolean;
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  isLeftDatePickerVisible: boolean;
  isRightDatePickerVisible: boolean;
  // radioBtnValue: string;
  nextDaysNum: string;
  nextEventsNum: string;
  selectValue: string;
}

// actions
// export interface IToggleRangeVisible {
//   type: typeof TOGGLE_RANGE_VISIBLE;
//   payload?: never;
// }

export interface ISetStartOFRange {
  type: typeof SET_START_OF_RANGE;
  payload: moment.Moment;
}

export interface ISetEndOFRange {
  type: typeof SET_END_OF_RANGE;
  payload: moment.Moment;
}

export interface ISetLeftDatePickerVisible {
  type: typeof SET_LEFT_DATEPICKER_VISIBLE;
  payload: boolean;
}

export interface TSetRightDatePickerVisible {
  type: typeof SET_RIGHT_DATEPICKER_VISIBLE;
  payload: boolean;
}

// export interface TSetRadioBtnValue {
//   type: typeof SET_RADIO_BTN_VALUE;
//   payload: string;
// }

export interface TSetNextDaysNum {
  type: typeof SET_NEXT_DAYS_NUM;
  payload: string;
}

export interface TSetNextEventsNum {
  type: typeof SET_NEXT_EVENTS_NUM;
  payload: string;
}

export interface TSetSelectValue {
  type: typeof SET_SELECT_VALUE;
  payload: string;
}

export type RangeActionsType =
  // | IToggleRangeVisible
  | ISetStartOFRange
  | ISetEndOFRange
  | ISetLeftDatePickerVisible
  | TSetRightDatePickerVisible
  // | TSetRadioBtnValue
  | TSetNextDaysNum
  | TSetNextEventsNum
  | TSetSelectValue;

export type RangeThunkActionType = ThunkAction<
  void,
  RootState,
  null,
  RangeActionsType
>;

// ----------------------------------------------
//		auth
// ----------------------------------------------
// reducer
export interface IUser {
  firstName: string;
  email: string;
  id: string;
  createdAt: any;
  role: 'user' | 'admin';
}

export interface IAuthState {
  user: IUser | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface ISignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

// actions
interface ISetUser {
  type: typeof SET_USER;
  payload: IUser;
}

interface ISetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface ISignOut {
  type: typeof SIGN_OUT;
}

interface ISetError {
  type: typeof SET_ERROR;
  payload: string;
}

interface INeedVerification {
  type: typeof NEED_VERIFICATION;
  payload: boolean;
}

interface ISetSuccess {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthActionsType =
  | ISetUser
  | ISetLoading
  | ISignOut
  | ISetError
  | INeedVerification
  | ISetSuccess;

export type AuthThunkActionType = ThunkAction<
  void,
  RootState,
  null,
  AuthActionsType
>;

// ----------------------------------------------
//		admin
// ----------------------------------------------
// reducer
export interface IAdminState {
  users: IUser[];
  loading: boolean;
  error: null | {};
}

// actions
interface IUsersRequested {
  type: typeof FETCH_USERS_REQUESTED;
}

interface IUsersLoaded {
  type: typeof FETCH_USERS_LOADED;
  payload: IUser[];
}

interface IUsersEror {
  type: typeof FETCH_USERS_ERROR;
  payload: {};
}

export type AdminActionsType = IUsersRequested | IUsersLoaded | IUsersEror;
export type AdminThunkActionType = ThunkAction<
  void,
  RootState,
  null,
  AdminActionsType
>;
