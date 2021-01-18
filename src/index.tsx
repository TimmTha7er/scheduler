import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SchedulerStoreService from './services/SchedulerStoreService';
import { App, SchedulerServiceProvider } from './components';

const schedulerStoreService = new SchedulerStoreService();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <SchedulerServiceProvider value={schedulerStoreService}>
      <App />
    </SchedulerServiceProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
