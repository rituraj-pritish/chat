import React from 'react';

const ChatMessages = ({ messages, secondUser }) => {
  const renderMessages = messages.map(({ message: msg, author, date, uid }) => {
    const dateString = new Date(date)
      .toString()
      .split(' ')
      .slice(1, 5)
      .join(' ');

    if (typeof msg === 'object') {
      if (msg.type === 'image') {
        return (
          <div className="mb-2" key={uid}>
            <a href={msg.url} target="_blank" rel="noopener noreferrer">
              <img
                src={msg.url}
                alt="msg"
                className={`w-32 ${
                  author === secondUser ? 'mr-auto' : 'ml-auto'
                }`}
              />
            </a>
            <div
              className={`text-gray-500 text-xs ${
                author === secondUser ? 'text-left' : 'text-right'
              }`}
            >
              {dateString}
            </div>
          </div>
        );
      }

      if (msg.type === 'document') {
        return (
          <div className="mb-2" key={uid}>
            <div
              className={`${
                author === secondUser ? 'text-left' : 'text-right'
              }`}
            >
              <a href={msg.url} target="_blank" rel="noopener noreferrer">
                {msg.fileName}
              </a>
            </div>
            <div
              className={`text-gray-500 text-xs ${
                author === secondUser ? 'text-left' : 'text-right'
              }`}
            >
              {dateString}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="mb-2" key={uid}>
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
    }
  });

  return renderMessages;
};

export default ChatMessages;
