import {
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
} from '../action-types';

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

export const toggleRangeVisible = (): RangeActionsType => {
  return {
    type: TOGGLE_RANGE_VISIBLE,
  };
};

export const setStartOFRange = (date: moment.Moment): RangeActionsType => {
  return {
    type: SET_START_OF_RANGE,
    payload: date,
  };
};

export const setEndOFRange = (date: moment.Moment): RangeActionsType => {
  return {
    type: SET_END_OF_RANGE,
    payload: date,
  };
};

export const setLeftDatePickerVisible = (value: boolean): RangeActionsType => {
  return {
    type: SET_LEFT_DATEPICKER_VISIBLE,
    payload: value,
  };
};

export const setRightDatePickerVisible = (value: boolean): RangeActionsType => {
  return {
    type: SET_RIGHT_DATEPICKER_VISIBLE,
    payload: value,
  };
};
