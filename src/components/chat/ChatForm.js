import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChatForm = ({ sendMessage, secondUser }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(secondUser, message);
    setMessage('');
  };

  return (
    <form
      className="sticky bg-white bottom-0 left-0 right-0 mt-auto w-full py-6 px-8 flex"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-grow bg-gray-200 px-2"
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="bg-indigo-500 hover:bg-indigo-600 rounded w-20 text-white py-2"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

ChatForm.propTypes = {};

export default ChatForm;
