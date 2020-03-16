import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clipIcon from 'assets/clip-icon.svg';

const ChatForm = ({
  sendMessage,
  secondUser,
  setShowOverlay,
  setShowDragDrop,
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(secondUser, message);
    setMessage('');
  };

  const handleAttachClick = () => {
    setShowOverlay(true);
    setShowDragDrop(true);
  };

  return (
    <div className="sticky bg-indigo-100 bottom-0 left-0 right-0 mt-auto w-full py-6 px-8 flex">
      <div
        className="w-8 flex items-center cursor-pointer mr-3"
        onClick={handleAttachClick}
      >
        <img src={clipIcon} alt="attachments" />
      </div>
      <form className="flex flex-grow" onSubmit={handleSubmit}>
        <input
          className="flex-grow bg-white px-2"
          type="text"
          placeholder="Start typing"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <button
          className="bg-indigo-500 hover:bg-indigo-600 rounded w-20 text-white py-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  secondUser: PropTypes.string,
  setShowOverlay: PropTypes.func.isRequired,
  setShowDragDrop: PropTypes.func.isRequired,
};

export default ChatForm;
