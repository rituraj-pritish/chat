import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignUp = ({ formData, handleChange, handleSubmit, authWithGoogle }) => {
  const { name, email, password, confirmPassword } = formData;

  return (
    <div className="w-full max-w-xs mx-auto mt-8 shadow-2xl rounded px-8 pt-6 pb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={name}
              required
            />
          </label>
        </div>

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
              required
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={confirmPassword}
              required
            />
          </label>
        </div>

        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center my-2">or</div>
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded w-full"
        onClick={authWithGoogle}
      >
        Sign Up With Google
      </button>
      <div className="text-gray mt-6">
        Already have an account ?{' '}
        <Link to="/signin" className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  formData: PropTypes.exact({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authWithGoogle: PropTypes.func.isRequired,
};

export default SignUp;
