import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';
import Core from './containers/base/Core';

const HomePage = loadable(() => import('./pages/home/HomePage'));

interface AppProps {}
const App: React.FC<AppProps> = () => (
  <React.Fragment>
    <Switch>
      <Route path="/" component={HomePage} exact />
    </Switch>
    <Core />
  </React.Fragment>
);

export default App;
