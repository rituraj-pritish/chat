import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import UserContext from 'contexts/user/UserContext';
import FilesPreview from './FilesPreview';

const FilesUploader = ({
  secondUser,
  showOverlay,
  showDragDrop,
  setShowOverlay,
  setShowDragDrop,
}) => {
  const userContext = useContext(UserContext);
  const { sendFiles } = userContext;

  const [files, setFiles] = useState([]);
  const [filesPrevUrls, setFilesPrevUrls] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleSend = () => {
    sendFiles(secondUser, files);
    setShowPreview(false);
    setShowOverlay(false);
    setFiles([]);
    setFilesPrevUrls([]);
  };

  const handleOverlayClose = (e) => {
    e.stopPropagation();
    setFiles([]);
    setFilesPrevUrls([]);
    setShowPreview(false);
    setShowOverlay(false);
    setShowDragDrop(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setShowDragDrop(false);
    setFiles(acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const path = reader.result;
        const isImage = file.type.split('/')[0] === 'image';

        setFilesPrevUrls((prev) => [
          ...prev,
          { type: isImage ? 'image' : 'document', url: path, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
      setShowPreview(true);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!showOverlay) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 top-0 flex justify-center items-center h-screen">
      {showOverlay && (
        <div className="absolute w-full h-full bg-gray-200 opacity-50 z-10" />
      )}
      {showDragDrop && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center w-full h-full z-20"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="bg-gray-400 rounded-full w-56 h-56 flex cursor-pointer justify-center items-center text-center relative">
              <p>Drag 'n' drop some files here, or click to select files</p>
              <span
                className="absolute right-0 top-0 z-30 cursor-pointer"
                onClick={handleOverlayClose}
              >
                Close
              </span>
            </div>
          )}
        </div>
      )}
      <FilesPreview
        open={showPreview}
        setOpen={setShowPreview}
        filesUrls={filesPrevUrls}
        handleSend={handleSend}
        handlePreviewClose={handleOverlayClose}
      />
    </div>
  );
};

FilesUploader.propTypes = {
  secondUser: PropTypes.string,
  showOverlay: PropTypes.bool.isRequired,
  showDragDrop: PropTypes.bool.isRequired,
  setShowOverlay: PropTypes.func.isRequired,
  setShowDragDrop: PropTypes.func.isRequired,
};

export default FilesUploader;
