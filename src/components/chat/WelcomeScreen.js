import React, { useContext } from 'react';

import AuthContext from 'contexts/auth/AuthContext';

const WelcomeScreen = () => {
  const authContext = useContext(AuthContext);
  const {
    user: { photoURL, displayName },
  } = authContext;

  return (
    <div className="absolute top-0 bottom-0 right-0 left-64 p-8 flex flex-col flex-grow justify-center">
      <img
        className="rounded-full w-32 mx-auto mb-8"
        src={photoURL}
        alt={displayName}
      />
      <h1 className="text-center">Welcome {displayName}</h1>
    </div>
  );
};

export default WelcomeScreen;
