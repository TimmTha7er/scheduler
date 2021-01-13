import { combineReducers } from 'redux';
import { createStore } from 'redux';
import {
  datePickerReducer,
  popupsReducer,
  gridReducer,
  rangeReducer,
} from './reducers';

const rootReducer = combineReducers({
  datePicker: datePickerReducer,
  popups: popupsReducer,
  grid: gridReducer,
  range: rangeReducer,
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
