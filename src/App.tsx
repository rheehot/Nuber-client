import React from 'react';
import loadable from '@loadable/component';

import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

import Core from './containers/base/Core';

const HomePage = loadable(() => import('./pages/home/HomePage'));
const LoginPage = loadable(() => import('./pages/LoginPage'));

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/" component={LoginPage} exact />
  </Switch>
);

interface AppProps {}
const App: React.FC<AppProps> = () => {
  const { isLogged } = useSelector((state: RootState) => state.core);
  return (
    <React.Fragment>
      {isLogged ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      <Core />
    </React.Fragment>
  );
};

export default App;
