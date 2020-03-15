import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import AuthState from 'contexts/auth/AuthState';
import './styles.css';

ReactDOM.render(
  <AuthState>
    <App />
  </AuthState>,
  document.getElementById('root'),
);
