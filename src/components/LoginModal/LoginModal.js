/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import TwoFAInput from './TwoFAInput';
import Signup from './Signup';
import { BankContext } from '../../context/Context';
import useWindowDimensions from '../../utils/WindowSize';

function LoginModal({ onClose, onLogin }) {
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, tostShowOn } = useContext(BankContext);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginOrSignup, setLoginOrSignup] = useState(true);
  const { width } = useWindowDimensions();

  const loginvalidate = (e) => {
    e.preventDefault();
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
              onLogin();
            } catch (error) {}
            Axios.post(
              'https://comms.globalxchange.com/gxb/apps/register/user',
              {
                email: emailid, // user email
                app_code: 'ice', // app_code
              }
            );
            setPassword('');
          } else if (data.mfa) {
            setMfaEnabled(true);
          } else {
            tostShowOn(data.message);
          }
        })
        .catch((error) => {
          tostShowOn(error.message ? error.message : 'Some Thing Went Wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      tostShowOn('Enter Valid EmailId');
    }
  };
  return (
    <div className={`login-modal ${firstLogin || width < 768}`}>
      <Zoom>
        <div className="login-signup d-flex w-100">
          {width < 768 && !loginOrSignup ? (
            ''
          ) : (
            <div className="login-wrap">
              {mfaEnabled ? (
                <TwoFAInput
                  onLogin={onLogin}
                  email={emailid}
                  setPassword={setPassword}
                  password={password}
                />
              ) : (
                <div className="card login-enter">
                  <h2 className="mt-5 mb-0 mx-5 login-text">Login</h2>
                  <div className="gx-account-text mx-5">
                    With Your GX Account
                  </div>
                  {/* <div className="new-cred mx-5">With Your New Credentials</div> */}
                  <form className="login-form mx-5" onSubmit={loginvalidate}>
                    <Fade bottom>
                      <div className="group">
                        <input
                          type="text"
                          name="email"
                          value={emailid}
                          onChange={(e) => setEmailId(e.target.value)}
                          required="required"
                        />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Email</label>
                      </div>
                    </Fade>
                    <Fade bottom>
                      <div className="group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required="required"
                        />
                        <span className="highlight" />
                        <span className="bar" />
                        <FontAwesomeIcon
                          className="eye"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                        <label>Password</label>
                      </div>
                    </Fade>
                    <Fade bottom>
                      <div className="group">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-darkblue mb-3"
                        >
                          {loading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                          ) : (
                            'LOGIN'
                          )}
                        </button>
                        {width < 768 ? (
                          <p
                            className="mx-auto mb-2 text-center"
                            onClick={() => setLoginOrSignup(false)}
                          >
                            Sign Up
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    </Fade>
                  </form>
                </div>
              )}
            </div>
          )}
          {width < 768 && loginOrSignup ? (
            ''
          ) : (
            <div className="signup-wrap">
              <Signup setFirstLogin={setFirstLogin} onClose={onClose} />
            </div>
          )}
        </div>
      </Zoom>
    </div>
  );
}

export default LoginModal;
