import React from 'react';
import loadable from '@loadable/component';

import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

import Core from './containers/base/Core';

const HomePage = loadable(() => import('./pages/home/HomePage'));
const LoginPage = loadable(() => import('./pages/LoginPage'));
const CodeLoginPage = loadable(() => import('./pages/CodeLoginPage'));
const EmailLoginPage = loadable(() => import('./pages/EmailLoginPage'));
const SMSLoginPage = loadable(() => import('./pages/SMSLoginPage'));
const RegisterPage = loadable(() => import('./pages/RegisterPage'));

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/" component={LoginPage} exact />
    <Route path="/email-login" component={EmailLoginPage} />
    <Route path="/sms-login" component={SMSLoginPage} />
    <Route path="/code" component={CodeLoginPage} />
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
