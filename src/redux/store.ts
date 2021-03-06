import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from "./reducers";

const rootReducer = combineReducers({
  datePicker: reducers.datePickerReducer,
  popups: reducers.popupsReducer,
  grid: reducers.gridReducer,
  range: reducers.rangeReducer,
  auth: reducers.authReducer,
  admin: reducers.adminReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
