import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ displayName, photoURL, online, active }) => {
  return (
    <div
      className={`flex m-2 p-2 h-20 hover:bg-gray-200 ${active &&
        'bg-gray-200'}`}
    >
      <div className="relative">
        <img className="w-16 rounded-full" src={photoURL} alt={displayName} />
        {online && (
          <div className="absolute bg-green-400 w-4 h-4 right-0 top-0 rounded-full" />
        )}
      </div>
      <div className="flex p-2 ml-2">
        <h1>{displayName}</h1>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

export default UserItem;
