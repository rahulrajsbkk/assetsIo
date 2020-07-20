import React from 'react';

function Toast({ message, show }) {
  return (
    <div className={`my-toast ${show ? 'on' : ''}`} aria-hidden="true">
      <span className="close">×</span>
      {message}
    </div>
  );
}

export default Toast;
