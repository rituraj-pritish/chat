import React from 'react';
import Loader from 'react-loader-spinner';

const AppLoader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
    <Loader type="Grid" color="#667eea" height={100} width={100} />
  </div>
);

export default AppLoader;
