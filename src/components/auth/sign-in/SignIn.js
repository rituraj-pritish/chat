import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignIn = ({ formData, handleChange, handleSubmit, authWithGoogle }) => {
  const { email, password } = formData;

  return (
    <div className="w-full max-w-xs mx-auto mt-8 shadow-2xl rounded px-8 pt-6 pb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
            />
          </label>
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Sign In
        </button>
      </form>
      <div className="text-center my-2">or</div>
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded w-full"
        onClick={authWithGoogle}
      >
        Sign In With Google
      </button>
      <div className="text-gray mt-6">
        New User ?{' '}
        <Link to="/signup" className="text-blue-700">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  formData: PropTypes.exact({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authWithGoogle: PropTypes.func.isRequired,
};

export default SignIn;
