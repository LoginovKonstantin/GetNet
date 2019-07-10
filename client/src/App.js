import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StartPage from './Containers/StartPage';

import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={`/*`} component={StartPage} />
      </Switch>
    </Router>
  </Provider>
);

export default App;