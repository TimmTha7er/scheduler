import {
  RangeAction,
  RangeActionTypes,
  RangeThunkAction,
  RangeState,
} from '../types';

export const setStartOFRange = (
  date: RangeState['startOfRange']
): RangeAction => {
  return {
    type: RangeActionTypes.SET_START_OF_RANGE,
    payload: date,
  };
};

export const setEndOFRange = (date: RangeState['endOfRange']): RangeAction => {
  return {
    type: RangeActionTypes.SET_END_OF_RANGE,
    payload: date,
  };
};

export const setLeftDatePickerVisible = (
  value: RangeState['isLeftDatePickerVisible']
): RangeAction => {
  return {
    type: RangeActionTypes.SET_LEFT_DATEPICKER_VISIBLE,
    payload: value,
  };
};

export const setRightDatePickerVisible = (
  value: RangeState['isRightDatePickerVisible']
): RangeAction => {
  return {
    type: RangeActionTypes.SET_RIGHT_DATEPICKER_VISIBLE,
    payload: value,
  };
};

export const setNextEventsNum = (
  value: RangeState['nextDaysNum']
): RangeThunkAction => {
  return async (dispatch) => {
    dispatch({
      type: RangeActionTypes.SET_NEXT_EVENTS_NUM,
      payload: value,
    });
  };
};

export const setNextDaysNum = (
  value: RangeState['nextEventsNum']
): RangeAction => {
  return {
    type: RangeActionTypes.SET_NEXT_DAYS_NUM,
    payload: value,
  };
};

export const setSelectValue = (
  value: RangeState['selectValue']
): RangeAction => {
  return {
    type: RangeActionTypes.SET_SELECT_VALUE,
    payload: value,
  };
};
