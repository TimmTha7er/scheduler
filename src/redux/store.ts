import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  datePickerReducer,
  popupsReducer,
  gridReducer,
  rangeReducer,
  authReducer,
  adminReducer,
} from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History, createBrowserHistory } from 'history';

const history: History = createBrowserHistory();

const rootReducer = combineReducers({
  datePicker: datePickerReducer,
  popups: popupsReducer,
  grid: gridReducer,
  range: rangeReducer,
  auth: authReducer,
  admin: adminReducer,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export { history, store };
