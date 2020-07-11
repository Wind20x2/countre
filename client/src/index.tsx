import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { FrontPage } from 'src/scenes/public/FrontPage';
import { Dashboard } from 'src/scenes/dashboard/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <FrontPage />
        </Route>

        <Route exact={true} path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
