import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function CentralizedTrust() {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="login-enter">
      <h2 className="login-text">Centralized</h2>
      <div className="gx-account-text">
        It Becomes Attached To Your GX Account
      </div>
      <form className="login-form">
        <div className="group">
          <input type="text" name="email" required />
          <span className="highlight" />
          <label>USERNAME</label>
        </div>
        <div className="group">
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            required
          />
          <span className="highlight" />
          <FontAwesomeIcon
            onClick={() => setShowPass(!showPass)}
            className="eye"
            icon={showPass ? faEyeSlash : faEye}
          />
          <label>PASSWORD</label>
        </div>
        <div className="group">
          <button type="submit" className="btn-primary-col">
            New Defan Trust
          </button>
        </div>
      </form>
    </div>
  );
}

export default CentralizedTrust;
