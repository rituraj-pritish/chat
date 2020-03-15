import React, { useContext } from 'react';

import AuthContext from 'contexts/auth/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { signOut, isAuthenticated } = authContext;

  return (
    <div className="bg-indigo-500 h-16">
      <div className=" max-w-screen-xl mx-auto px-8 h-full flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/">CHAT</Link>
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
