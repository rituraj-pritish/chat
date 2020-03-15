import React, { useEffect, useContext, useState } from 'react';

import UserContext from 'contexts/user/UserContext';
import Users from 'components/users/Users';
import Chat from 'components/chat/Chat';

const Home = () => {
  const userContext = useContext(UserContext);
  const {
    users,
    getUsers,
    sendMessage,
    messages,
    getChat,
    clearChat,
  } = userContext;

  const [secondUser, setSecondUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="relative max-w-screen-xl w-full mx-auto flex flex-grow">
      <Users
        users={users}
        setSecondUser={setSecondUser}
        secondUser={secondUser}
      />
      <Chat
        secondUser={secondUser}
        sendMessage={sendMessage}
        getChat={getChat}
        messages={messages}
        clearChat={clearChat}
      />
    </div>
  );
};

export default Home;
