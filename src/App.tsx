import React from 'react';
import loadable from '@loadable/component';

import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

import Core from './containers/base/Core';
import BottomNavigation from './components/common/BottomNavigation';

const HomePage = loadable(() => import('./pages/HomePage'));
const LoginPage = loadable(() => import('./pages/LoginPage'));
const CodeLoginPage = loadable(() => import('./pages/CodeLoginPage'));
const EmailLoginPage = loadable(() => import('./pages/EmailLoginPage'));
const SMSLoginPage = loadable(() => import('./pages/SMSLoginPage'));
const RegisterPage = loadable(() => import('./pages/RegisterPage'));

const LoggedInRoutes = () => (
  <React.Fragment>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/nav" component={HomePage} />
      <Route path="/bus" component={HomePage} />
      <Route path="/raillway" component={HomePage} />
    </Switch>
    <BottomNavigation />
  </React.Fragment>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/" component={LoginPage} exact />
    <Route path="/email" component={EmailLoginPage} />
    <Route path="/sms" component={SMSLoginPage} />
    <Route path="/code-login" component={CodeLoginPage} />
    <Route path="/register" component={RegisterPage} />
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
