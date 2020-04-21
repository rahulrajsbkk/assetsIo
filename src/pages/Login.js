/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import message from 'antd/lib/message';
import logoText from '../static/images/logo-text.svg';
import { BankContext } from '../context/Context';

function Login({ history }) {
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, email } = useContext(BankContext);
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
          console.log('data :', data);
          if (data.status) {
            login(emailid, data.accessToken, data.idToken);
            message.success(data.message);
            history.push('/');
          } else {
            message.error(data.message);
          }
        })
        .catch((error) => {
          message.error(
            error.message ? error.message : 'Some Thing Went Wrong!'
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      message.error('Enter Valid EmailId');
    }
  };

  return (
    <div className="login-page d-flex">
      <div className="d-flex flex-column mx-auto my-auto">
        <Zoom>
          <img className="img-logo mx-auto" src={logoText} alt="" />
        </Zoom>
        <Fade bottom>
          <div className="login-form d-flex flex-column mx-auto">
            <form className="d-flex" onSubmit={loginvalidate}>
              <div className="col-9 p-0">
                <div className="group">
                  <input
                    type="text"
                    value={emailid}
                    onChange={(e) => setEmailId(e.target.value)}
                    required="required"
                  />
                  <span className="highlight" />
                  <span className="bar" />
                  <label>Email</label>
                </div>
                <div className="border-bottom" />
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required="required"
                  />
                  <label>Password</label>
                </div>
              </div>
              <div className="d-flex col-3 p-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-unbank"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-pulse" />
                  ) : (
                    'UnBank'
                  )}
                </button>
              </div>
            </form>
            <button type="button" className="btn-forgot mx-auto">
              Forgot Password
            </button>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Login;
