import React from 'react';
import UserContext from 'contexts/user/UserContext';

const FilesPreview = ({ open, handlePreviewClose, filesUrls, handleSend }) => {
  if (!open) return null;

  return (
    <div className="bg-pink-100 z-30 w-full text-center py-6">
      <div className="flex overflow-x-scroll">
        {filesUrls.map(({ type, url, name }) => {
          if (type === 'image') {
            return <img className="w-32 my-3 mx-4" src={url} alt={name} />;
          } else {
            return (
              <div className="w-32 my-3 mx-4 flex justify-center items-center">
                {name}
              </div>
            );
          }
        })}
      </div>

      <button
        onClick={handleSend}
        type="button"
        className="bg-indigo-500 hover:bg-indigo-600 py-2 px-4 mt-3 text-bold text-white rounded"
      >
        SEND
      </button>
    </div>
  );
};

export default FilesPreview;
