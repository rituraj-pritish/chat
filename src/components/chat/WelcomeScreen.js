import React, { useContext } from 'react';

import AuthContext from 'contexts/auth/AuthContext';

const WelcomeScreen = () => {
  const authContext = useContext(AuthContext);
  const {
    user: { photoURL, displayName },
  } = authContext;

  return (
    <div className="absolute top-0 bottom-0 right-0 left-64 bg-indigo-100 p-8 flex flex-col flex-grow justify-center">
      <div
        className="rounded-full w-32 h-32 mx-auto mb-8"
        style={{ background: `url(${photoURL}) center center / cover` }}
      />
      <h1 className="text-center">Welcome {displayName}</h1>
    </div>
  );
};

export default WelcomeScreen;
