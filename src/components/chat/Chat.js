import React, { useEffect, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import AuthContext from 'contexts/auth/AuthContext';
import ChatForm from './ChatForm';

const Chat = ({ secondUser, sendMessage, getChat, messages, clearChat }) => {
  const authContext = useContext(AuthContext);
  const {
    user: { photoURL, displayName },
  } = authContext;

  useEffect(() => {
    if (secondUser) getChat(secondUser);

    return () => {
      clearChat();
    };
  }, [secondUser]);

  if (!secondUser) {
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
  }

  const renderMessages = messages.map(({ message: msg, author, date }) => {
    const dateString = new Date(date)
      .toString()
      .split(' ')
      .slice(1, 5)
      .join(' ');

    return (
      <div className="mb-2" key={date}>
        <p
          className={`bg-indigo-100 px-2 py-1 rounded break-words max-w-md ${
            author === secondUser ? 'mr-auto' : 'ml-auto'
          }`}
          style={{ width: 'max-content' }}
        >
          {msg}
        </p>
        <div
          className={`text-gray-500 text-xs ${
            author === secondUser ? 'text-left' : 'text-right'
          }`}
        >
          {dateString}
        </div>
      </div>
    );
  });

  return (
    <div className="flex-grow absolute top-0 bottom-0 right-0 left-64 px-8 pt-8 overflow-y-scroll flex flex-col">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500">
          Send a message to start a conversation
        </div>
      ) : (
        renderMessages
      )}
      <ChatForm secondUser={secondUser} sendMessage={sendMessage} />
    </div>
  );
};

Chat.propTypes = {
  secondUser: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  getChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default Chat;
