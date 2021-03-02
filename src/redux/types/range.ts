import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

// action types
export enum RangeActionTypes {
  SET_START_OF_RANGE = 'range/SET_START_OF_RANGE',
  SET_END_OF_RANGE = 'range/SET_END_OF_RANGE',
  SET_LEFT_DATEPICKER_VISIBLE = 'range/SET_LEFT_DATEPICKER_VISIBLE',
  SET_RIGHT_DATEPICKER_VISIBLE = 'range/SET_RIGHT_DATEPICKER_VISIBLE',
  SET_NEXT_DAYS_NUM = 'range/SET_NEXT_DAYS_NUM',
  SET_NEXT_EVENTS_NUM = 'range/SET_NEXT_EVENTS_NUM',
  SET_SELECT_VALUE = 'range/SET_SELECT_VALUE',
}

// reducer
export interface RangeState {
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  isLeftDatePickerVisible: boolean;
  isRightDatePickerVisible: boolean;
  nextDaysNum: string;
  nextEventsNum: string;
  selectValue: string;
}

// actions
interface SetStartOFRange {
  type: typeof RangeActionTypes.SET_START_OF_RANGE;
  payload: RangeState['startOfRange'];
}

interface SetEndOFRange {
  type: typeof RangeActionTypes.SET_END_OF_RANGE;
  payload: RangeState['endOfRange'];
}

interface SetLeftDatePickerVisible {
  type: typeof RangeActionTypes.SET_LEFT_DATEPICKER_VISIBLE;
  payload: RangeState['isLeftDatePickerVisible'];
}

interface SetRightDatePickerVisible {
  type: typeof RangeActionTypes.SET_RIGHT_DATEPICKER_VISIBLE;
  payload: RangeState['isRightDatePickerVisible'];
}

interface SetNextDaysNum {
  type: typeof RangeActionTypes.SET_NEXT_DAYS_NUM;
  payload: RangeState['nextDaysNum'];
}

interface SetNextEventsNum {
  type: typeof RangeActionTypes.SET_NEXT_EVENTS_NUM;
  payload: RangeState['nextEventsNum'];
}

interface SetSelectValue {
  type: typeof RangeActionTypes.SET_SELECT_VALUE;
  payload: RangeState['selectValue'];
}

export type RangeAction =
  | SetStartOFRange
  | SetEndOFRange
  | SetLeftDatePickerVisible
  | SetRightDatePickerVisible
  | SetNextDaysNum
  | SetNextEventsNum
  | SetSelectValue;

export type RangeThunkAction = ThunkAction<void, RootState, null, RangeAction>;
