import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UserState from 'contexts/user/UserState';
import AuthContext from 'contexts/auth/AuthContext';
import SignInContainer from 'components/auth/sign-in/SignInContainer';
import SignUpContainer from 'components/auth/sign-up/SignUpContainer';
import ProtectedRoute from './ProtectedRoute';
import Home from './home/Home';
import Loader from './Loader';
import Navbar from './navbar/Navbar';

const App = () => {
  const authContext = useContext(AuthContext);
  const { authStateChangeHandler, loading } = authContext;

  useEffect(() => {
    authStateChangeHandler();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <UserState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/signin" component={SignInContainer} />
            <Route exact path="/signup" component={SignUpContainer} />
            <ProtectedRoute exact path="/" component={Home} />
          </Switch>
        </Router>
      </UserState>
    </div>
  );
};

export default App;
