import React, { useContext } from 'react';

import AuthContext from 'contexts/auth/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { signOut, isAuthenticated, user } = authContext;

  let firstName;
  if (user) {
    firstName = user.displayName.split(' ').splice(0, 1);
  }

  return (
    <div className="bg-indigo-500 h-16">
      <div className=" max-w-screen-xl mx-auto px-8 h-full flex justify-between items-center">
        <div className="flex items-center text-white ">
          <Link className="text-2xl font-bold" to="/">
            CHAT
          </Link>
          <div className="ml-3">Hi {firstName}</div>
        </div>
        {isAuthenticated && (
          <button
            type="button"
            className="bg-white px-3 py-1 rounded "
            onClick={signOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
