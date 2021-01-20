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
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
} from './action-types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

// ----------------------------------------------
//		date picker
// ----------------------------------------------
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

// reducer
export interface IDatePickerState {
  date: moment.Moment;
  isVisible: boolean;
}

// ----------------------------------------------
//		grid
// ----------------------------------------------
export interface IEvent {
  title: string;
  descr: string;
  id?: string;
  time?: string;
}

export interface IEventList {
  [name: string]: IEvent;
}

export interface ICreateEvent {
  type: typeof CREATE_EVENT;
  payload: any;
}

// actions
interface IEDITEvent {
  type: typeof EDIT_EVENT;
  payload: any;
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
  payload: any;
}

interface IEventsEror {
  type: typeof FETCH_EVENTS_ERROR;
  payload: {};
}

export type GridActionsType =
  | ICreateEvent
  | IDeleteEvent
  | IEDITEvent
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

// reducer
export interface IGridState {
  rowDate: moment.Moment | null;
  events: IEventList | any;
  loading: boolean;
  error: null | {};
}

// ----------------------------------------------
//		popups
// ----------------------------------------------
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

// reducer
export interface IPopupsState {
  isCreatePopupVisible: boolean;
  isPreviewPopupVisible: boolean;
  isDeletePopupVisible: boolean;
	isEditPopupVisible: boolean;
}

// ----------------------------------------------
//		range
// ----------------------------------------------
// actions
export interface IToggleRangeVisible {
  type: typeof TOGGLE_RANGE_VISIBLE;
  payload?: never;
}

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

export type RangeActionsType =
  | IToggleRangeVisible
  | ISetStartOFRange
  | ISetEndOFRange
  | ISetLeftDatePickerVisible
  | TSetRightDatePickerVisible;

// reducer
export interface IRangeState {
  isRangeVisible: boolean;
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  isLeftDatePickerVisible: boolean;
  isRightDatePickerVisible: boolean;
}
