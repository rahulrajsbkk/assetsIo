import React from 'react';
import LoginModal from './LoginModal';

function LoginWrapper({ onClose, onLogin }) {
  return (
    <div className="login-wrapper">
      <div className="bg-close"></div>
      <LoginModal onClose={onClose} onLogin={onLogin} />
    </div>
  );
}

export default LoginWrapper;
