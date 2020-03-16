import React from 'react';

const ChatMessages = ({ messages, secondUser }) => {
  const renderMessages = messages.map(({ message: msg, author, date, uid }) => {
    const dateString = new Date(date)
      .toString()
      .split(' ')
      .slice(1, 5)
      .join(' ');

    if (typeof msg === 'object') {
      const { fileName, url } = msg;

      if (msg.type === 'image') {
        return (
          <div
            className={`mb-2 ${author === secondUser ? 'mr-auto' : 'ml-auto'}`}
            style={{ width: 'max-content' }}
            key={uid}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={url} alt={fileName} className="w-32" />
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
          <div
            className={` mb-2 ${author === secondUser ? 'mr-auto' : 'ml-auto'}`}
            key={uid}
            style={{ width: 'max-content' }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-green-200">
                {fileName}
                <div className="text-indigo-400 text-xs mt-2">
                  Document: Click to open
                </div>
              </div>
            </a>
            <div
              className={`text-gray-500 text-xs ${
                author === secondUser ? 'text-right' : 'text-left'
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
            className={`bg-green-200 px-2 py-1 rounded break-words max-w-md ${
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
