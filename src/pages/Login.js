/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import logoText from '../static/images/logo-text.svg';
import { BankContext } from '../context/Context';

function Login({ history }) {
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, tostShowOn } = useContext(BankContext);
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
            login(emailid, data.accessToken, data.idToken);
            // tostShowOn(data.message);
            history.push('/');
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
    <div className="login-page d-flex">
      <div className="d-flex flex-column mx-auto my-auto">
        <Zoom>
          <img className="img-logo mx-auto" src={logoText} alt="" />
        </Zoom>
        <Fade bottom>
          <div className="login-form d-flex flex-column mx-auto">
            <form className="d-flex" onSubmit={loginvalidate}>
              <div className="col p-0">
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
              <div className="d-flex px-2 p-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-unbank"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
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
