import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Switch, Route } from 'react-router-dom';
import { Header, Popups } from '../components';
import { HomePage, DayPage, SchedulePage } from '../pages';
import '../scss/index.scss';

const App: React.FC = () => {
  return (
    <>
      <PerfectScrollbar>
        <div className='container'>
          <Header></Header>
          <main className='main'>
            <Switch>
              <Route exact path='/' component={DayPage} />
              <Route path='/day' component={DayPage} />
              <Route path='/schedule' component={SchedulePage} />
            </Switch>
          </main>
        </div>
      </PerfectScrollbar>

      <Popups />
    </>
  );
};

export default App;
