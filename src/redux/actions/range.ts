import {
  TOGGLE_RANGE_VISIBLE,
  SET_START_OF_RANGE,
  SET_END_OF_RANGE,
  SET_LEFT_DATEPICKER_VISIBLE,
  SET_RIGHT_DATEPICKER_VISIBLE,
  SET_RADIO_BTN_VALUE,
  SET_NEXT_DAYS_NUM,
  SET_NEXT_EVENTS_NUM,
  SET_SELECT_VALUE,
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

export const setRadioBtnValue = (value: string): RangeActionsType => {
  return {
    type: SET_RADIO_BTN_VALUE,
    payload: value,
  };
};

export const setNextEventsNum = (value: string): RangeActionsType => {
  return {
    type: SET_NEXT_EVENTS_NUM,
    payload: value,
  };
};

export const setNextDaysNum = (value: string): RangeActionsType => {
  return {
    type: SET_NEXT_DAYS_NUM,
    payload: value,
  };
};

export const setSelectValue = (value: string): RangeActionsType => {
  return {
    type: SET_SELECT_VALUE,
    payload: value,
  };
};
