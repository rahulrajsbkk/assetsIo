import React, { useState, useContext } from 'react';
import Axios from 'axios';
import message from 'antd/lib/message';
import { setAppLoginData } from '../../utils';
import { Redirect } from 'react-router-dom';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { setEmailId } = useContext(OptionsContext);
  const [loading, setLoading] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [googlePin, setGooglePin] = useState('');
  const login = (e) => {
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setLoading(true);
      if (mfaEnabled) {
        Axios.post('https://gxauth.apimachine.com/gx/user/login', {
          email: email,
          password: password,
          totp_code: googlePin,
        })
          .then((response) => {
            const { data } = response;
            setLoading(false);
            if (data.status) {
              setAppLoginData(data.idToken, data.accessToken, email);
              setEmailId(email);
              if (history) {
                history.push('/');
              } else setRedirect(true);
            } else {
              setErrorMsg(data.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        Axios.post('https://gxauth.apimachine.com/gx/user/login', {
          email: email,
          password: password,
        })
          .then((response) => {
            const { data } = response;
            setLoading(false);
            if (data.status) {
              setAppLoginData(data.idToken, data.accessToken, email);
              setEmailId(email);
              if (history) {
                history.push('/');
              } else setRedirect(true);
            } else if (data.mfa) {
              setMfaEnabled(true);
            } else {
              setErrorMsg(data.message);
            }
          })
          .catch((error) => {
            console.log('Login Error', error);
            setErrorMsg('Some Thing Went Wrong!');
            setLoading(false);
          });
      }
    } else {
      message.error('Enter Valid Email');
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  } else
    return (
      <div className="black-full-page text-white d-flex flex-column justify-content-around">
        <div className="d-flex flex-column">
          <Zoom>
            <h1 className="token-title">
              T<i className="charts-icon-">&#59652;</i>KEN
            </h1>
            <h2 className="token-sub-title">Options</h2>
          </Zoom>
          <form className="login-form mx-auto" onSubmit={login}>
            {mfaEnabled ? (
              <Fade bottom>
                <div className="group">
                  <input
                    type="password"
                    value={googlePin}
                    onChange={(e) => setGooglePin(e.target.value)}
                    required="required"
                  />
                  <span className="highlight" />
                  <span className="bar" />
                  <label>Enter Google Authenticator Code</label>
                </div>
              </Fade>
            ) : (
              <>
                <Fade bottom>
                  <div className="group">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required="required"
                    />
                    <span className="highlight" />
                    <span className="bar" />
                    <label>Password</label>
                  </div>
                </Fade>
              </>
            )}

            <Fade bottom>
              <button disabled={loading} className="btn btn-outline-light">
                {loading ? <i className="fas fa-spinner fa-pulse" /> : 'LOGIN'}
              </button>
              <p className="text-danger">{errorMsg}</p>
            </Fade>
          </form>
        </div>
      </div>
    );
}

export default LoginPage;
