import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
