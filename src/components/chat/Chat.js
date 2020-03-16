import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ComponentLoader from 'components/loaders/ComponentLoader';
import ChatForm from './ChatForm';
import FilesUploader from './files-uploader/FilesUploader';
import ChatMessages from './ChatMessages';
import WelcomeScreen from './WelcomeScreen';

const Chat = ({
  secondUser,
  sendMessage,
  getChat,
  messages,
  clearChat,
  loading,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDragDrop, setShowDragDrop] = useState(false);

  useEffect(() => {
    if (secondUser) getChat(secondUser);

    return () => {
      clearChat();
    };
  }, [secondUser]);

  const chatRoom = document.getElementById('chat-room');

  useEffect(() => {
    if (chatRoom) chatRoom.scrollTo(0, chatRoom.scrollHeight);
  }, [messages]);

  if (!secondUser) return <WelcomeScreen />;

  return (
    <div
      id="chat-room"
      className="flex-grow bg-indigo-100 absolute top-0 bottom-0 right-0 left-64 px-8 pt-8 overflow-y-scroll flex flex-col"
    >
      {loading && <ComponentLoader />}
      {messages.length === 0 && !loading ? (
        <div className="text-center text-gray-500">
          Send a message to start a conversation
        </div>
      ) : (
        <ChatMessages messages={messages} secondUser={secondUser} />
      )}
      <FilesUploader
        showOverlay={showOverlay}
        showDragDrop={showDragDrop}
        setShowDragDrop={setShowDragDrop}
        setShowOverlay={setShowOverlay}
        secondUser={secondUser}
      />
      <ChatForm
        setShowOverlay={setShowOverlay}
        setShowDragDrop={setShowDragDrop}
        secondUser={secondUser}
        sendMessage={sendMessage}
      />
    </div>
  );
};

Chat.propTypes = {
  secondUser: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  getChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Chat;
