import {
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
} from '../action-types';
import { RangeActionsType } from '../interfaces';

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
