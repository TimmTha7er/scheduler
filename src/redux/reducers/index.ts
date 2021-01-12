import { combineReducers } from 'redux';
import datePickerReducer from './datePicker';
import popupsReducer from './popups';
import gridReducer from './grid';
import rangeReducer from './range';

const rootReducer = combineReducers({
  datePicker: datePickerReducer,
  popups: popupsReducer,
  grid: gridReducer,
  range: rangeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
