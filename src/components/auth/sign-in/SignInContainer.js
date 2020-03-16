import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from 'contexts/auth/AuthContext';
import SignIn from './SignIn';

const SignInContainer = () => {
  const authContext = useContext(AuthContext);
  const { signIn, authWithGoogle, isAuthenticated } = authContext;

  const [formData, setFormData] = useState({
    email: 'jd@gmail.com',
    password: '123123',
  });

  if (isAuthenticated) return <Redirect to="/" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
    <SignIn
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      authWithGoogle={authWithGoogle}
    />
  );
};

export default SignInContainer;
