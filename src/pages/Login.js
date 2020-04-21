import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Axios from 'axios';
import message from 'antd/lib/message';
import logoText from '../static/images/logo-text.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setLoading(true);
      Axios.post('https://gxauth.apimachine.com/gx/user/login', {
        email,
        password,
      })
        .then((response) => {
          // const { data } = response;
          console.log('response :', response);
        })
        .catch((error) => {
          console.log('Login Error', error);
          setErrorMsg('Some Thing Went Wrong!');
          setLoading(false);
        });
    } else {
      message.error('Enter Valid Email');
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
            <form className="d-flex" onSubmit={login}>
              <div className="col-9 p-0">
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
            <p className="text-danger">{errorMsg}</p>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Login;
