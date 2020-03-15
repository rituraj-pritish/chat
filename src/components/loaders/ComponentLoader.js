import React from 'react';
import Loader from 'react-loader-spinner';

const ComponentLoader = () => (
  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
    <Loader type="TailSpin" color="#667eea" />
  </div>
);

export default ComponentLoader;
