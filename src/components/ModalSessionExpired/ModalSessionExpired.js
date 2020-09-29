import React, { useContext, useState } from 'react';
import Axios from 'axios';

import logo from '../../static/images/assetsLogo.svg';
import { BankContext } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ModalSessionExpired({ onClose }) {
  const { login, email, tostShowOn } = useContext(BankContext);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const loginvalidate = () => {
    setLoading(true);
    Axios.post('https://gxauth.apimachine.com/gx/user/login', {
      email,
      password,
    })
      .then((response) => {
        const { data } = response;
        if (data.status) {
          login(email, data.accessToken, data.idToken, data.deviceKey);
          setPassword('');
        } else {
          login();
          tostShowOn(data.message);
        }
      })
      .catch((error) => {
        tostShowOn(error.message ? error.message : 'Some Thing Went Wrong!');
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <div className="modalSessionExpired">
      <div className="overlayClose" />
      <div className="modalContent">
        <div className="head">
          <img src={logo} alt="" />
          <h5>Session Expired</h5>
        </div>
        <div className="contents">
          <div className="label">You Have To Enter Your Password Again</div>
          <input
            type="password"
            placeholder="Enter Password"
            className="passwordInput"
          />
          <div className="btnLogin" onClick={loginvalidate}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'LOGIN'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSessionExpired;
