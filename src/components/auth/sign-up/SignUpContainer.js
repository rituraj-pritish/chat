import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from 'contexts/auth/AuthContext';
import SignUp from './SignUp';

const SignUpContainer = () => {
  const authContext = useContext(AuthContext);
  const { signUp, isAuthenticated, authWithGoogle } = authContext;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password } = formData;

  if (isAuthenticated) return <Redirect to="/" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ name, email, password });
  };

  return (
    <SignUp
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      authWithGoogle={authWithGoogle}
    />
  );
};

export default SignUpContainer;
