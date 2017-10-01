import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import { history } from './store/configureStore';
import NotFound from './containers/NotFound';
import asyncComponent from './components/AsyncComponent';

const Dashboard = asyncComponent(() =>
  import('./containers/Dashboard')
    .then(module => module.default)
    .then(
      module =>
        new Promise((resolve) => {
          // TODO: Fake timeout to see loader
          setTimeout(() => {
            resolve(module);
          }, 400);
        }),
    ),
);

const App = () => (
  <ConnectedRouter basename="/NEOfeed" history={history}>
    <div>
      <Switch>
        <Route path="/not-found" exact component={NotFound} />
        <Route component={Dashboard} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;
