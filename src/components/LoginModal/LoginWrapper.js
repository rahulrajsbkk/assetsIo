import React, { useState } from 'react';
import LoginModal from './LoginModal';
import useWindowDimensions from '../../utils/WindowSize';
import LoginMobile from './Mobile/LoginMobile';
import SignupMobile from './Mobile/SignupMobile';

function LoginWrapper({ onClose, onLogin }) {
  const { width } = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="login-wrapper">
      <div
        className="bg-close"
        onClick={() => {
          try {
            onClose();
          } catch (error) {}
        }}
      />
      {width > 768 ? (
        <LoginModal onClose={onClose} onLogin={onLogin} />
      ) : isLogin ? (
        <LoginMobile onLogin={onLogin} />
      ) : (
        <SignupMobile setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default LoginWrapper;
