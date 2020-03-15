import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

const Users = ({ users, setSecondUser, secondUser }) => {
  const render = users.map((user) => {
    return (
      <div
        key={user.uid}
        className="cursor-pointer"
        onClick={() => setSecondUser(user.uid)}
      >
        <UserItem {...user} active={user.uid === secondUser} />
      </div>
    );
  });
  return (
    <div className="absolute left-0 top-0 bottom-0 max-w-xs w-64 bg-yellow-200 overflow-y-scroll">
      {render}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSecondUser: PropTypes.func.isRequired,
};

export default Users;
