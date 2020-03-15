import React, { useCallback, useState, useContext } from 'react';
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

  const handleOverlayClose = () => {
    setFiles([]);
    setFilesPrevUrls([]);
    setShowPreview(false);
    setShowOverlay(false);
    setShowDragDrop(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log('this');
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

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
      {showOverlay && (
        <>
          <div className="absolute w-full h-full bg-gray-200 opacity-50 z-10" />
          <span
            className="absolute right-0 top-0 z-20 cursor-pointer"
            onClick={handleOverlayClose}
          >
            Close
          </span>
        </>
      )}
      {showDragDrop && (
        <div className="flex justify-center z-20" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="bg-gray-400 rounded-full w-56 h-56 cursor-pointer flex justify-center items-center text-center">
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </div>
      )}
      <FilesPreview
        open={showPreview}
        setOpen={setShowPreview}
        filesUrls={filesPrevUrls}
        handleSend={handleSend}
      />
    </div>
  );
};

export default FilesUploader;
