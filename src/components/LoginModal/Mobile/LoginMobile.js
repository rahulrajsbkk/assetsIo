import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { BankContext } from '../../../context/Context';
import emailIcon from '../../../static/images/formIcons/email.svg';
import passwordIcon from '../../../static/images/formIcons/password.svg';

function LoginMobile({ setIsLogin, onLogin }) {
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, tostShowOn } = useContext(BankContext);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginvalidate = (e) => {
    e.preventDefault();
    if (!loading)
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailid)) {
        setLoading(true);
        Axios.post('https://gxauth.apimachine.com/gx/user/login', {
          email: emailid,
          password,
        })
          .then((response) => {
            const { data } = response;
            if (data.status) {
              login(emailid, data.accessToken, data.idToken, data.deviceKey);
              try {
                setIsLogin(true);
              } catch (error) {}
              Axios.post(
                'https://comms.globalxchange.com/gxb/apps/register/user',
                {
                  email: emailid, // user email
                  app_code: 'ice', // app_code
                }
              );
              try {
                onLogin();
              } catch (error) {}
              setPassword('');
            } else if (data.mfa) {
              setMfaEnabled(true);
            } else {
              tostShowOn(data.message);
            }
          })
          .catch((error) => {
            tostShowOn(
              error.message ? error.message : 'Some Thing Went Wrong!'
            );
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        tostShowOn('Enter Valid EmailId');
      }
  };
  console.log('mfaEnabled', mfaEnabled); //To Handle Not Used
  return (
    <div className="mobileLogin">
      <div className="login-enter">
        <div className="main-text">Login</div>
        <div className="sub-text">Please sign in to continue.</div>
        <div className="stepContent">
          <Fade bottom>
            <label className="group">
              <img src={emailIcon} alt="" />
              <input
                type="text"
                name="email"
                placeholder="EMAIL"
                value={emailid}
                onChange={(e) => setEmailId(e.target.value)}
                required="required"
              />
            </label>
          </Fade>
          <Fade bottom>
            <label className="group">
              <img src={passwordIcon} alt="" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                required="required"
              />
              <FontAwesomeIcon
                className="eye"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                icon={showPassword ? faEyeSlash : faEye}
              />
            </label>
          </Fade>
        </div>
      </div>
      <div className="bottomBtn" onClick={loginvalidate}>
        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Access Account'}
      </div>
    </div>
  );
}

export default LoginMobile;
