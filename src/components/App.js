import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import PasswordForget from './pages/PasswordForget';
import Home from './pages/Home';
import Account from './pages/Account';
import Navigation from './Navigation';

import SignInForm from './pages/SignIn';
import { PasswordForgetLink } from './pages/PasswordForget';
import { SignUpLink } from './pages/SignUp';

import withAuthentication from './auth/withAuthentication';

import * as ROUTES from '../constants/routes';

import './App.scss';

const App = () => (
  <Router>
    <Route
      exact
      path={ROUTES.LANDING}
      render={() => (
        <Landing>
          <SignInForm />
          <PasswordForgetLink />
          <SignUpLink />
        </Landing>
      )}
    />
    <Route
      path={ROUTES.SIGN_UP}
      render={() => (
        <Landing>
          <SignUp />
        </Landing>
      )}
    />
    <Route
      path={ROUTES.PASSWORD_FORGET}
      render={() => (
        <Landing>
          <PasswordForget />
        </Landing>
      )}
    />
    <Route path={ROUTES.HOME} render={() => withNavigation(Home)} />
    <Route path={ROUTES.ACCOUNT} render={() => withNavigation(Account)} />
  </Router>
);

const withNavigation = Component => (
  <React.Fragment>
    <Navigation />
    <Component />
  </React.Fragment>
);

export default withAuthentication(App);
