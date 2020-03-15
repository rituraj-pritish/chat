import React, { useContext } from 'react';

import AuthContext from 'contexts/auth/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { signOut, isAuthenticated, user } = authContext;

  let firstName;
  if (user && user.displayName) {
    firstName = user.displayName.split(' ').splice(0, 1);
  }

  return (
    <div className="bg-indigo-500 h-16">
      <div className=" max-w-screen-xl mx-auto px-8 h-full flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/">CHAT</Link>
        </div>
        {isAuthenticated && (
          <>
            {firstName}
            <button
              type="button"
              className="bg-white text-gray-200"
              onClick={signOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
