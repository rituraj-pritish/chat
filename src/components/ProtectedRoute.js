import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';
import AuthContext from 'contexts/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (!isAuthenticated && !loading) return <Redirect to="/signin" />;
  // eslint-disable-next-line
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
