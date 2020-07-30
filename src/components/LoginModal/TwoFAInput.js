import React, { useState, useEffect, useContext } from 'react';
import OtpInput from 'react-otp-input';
import Axios from 'axios';
import Lottie from 'react-lottie';
import * as animationData from '../../static/animations/cpu-loading.json';
import logo from '../../static/images/logo.svg';
import { BankContext } from '../../context/Context';

function TwoFAInput({ email, password, setPassword, onLogin }) {
  const [twoFa, setTwoFa] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, tostShowOn } = useContext(BankContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    if (twoFa.toString().length === 6) {
      setLoading(true);
      Axios.post('https://gxauth.apimachine.com/gx/user/login', {
        email: email,
        password: password,
        totp_code: twoFa.toString(),
      })
        .then((response) => {
          const { data } = response;
          if (data.status) {
            login(email, data.accessToken, data.idToken);
            try {
              onLogin();
            } catch (error) {}
            Axios.post(
              'https://comms.globalxchange.com/gxb/apps/register/user',
              {
                email: email, // user email
                app_code: 'ice', // app_code
              }
            );
            setPassword('');
          } else {
            tostShowOn(data.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [twoFa, email, login, password, setPassword, tostShowOn, onLogin]);

  const change2fa = (e) => {
    const re = new RegExp(/^\d*$/);
    if (e === '' || re.test(e)) {
      setTwoFa(e);
    }
  };
  return (
    <div className="card twofa-login">
      {loading ? (
        <div className="loading">
          <Lottie options={defaultOptions} height={150} width={150} />
          <h6>Authenticating</h6>
        </div>
      ) : (
        <>
          <img src={logo} alt="" />
          <h5>Enter The Code On Your Google Authenticator</h5>
          <OtpInput
            containerStyle="input-wrapper-2fa"
            value={twoFa}
            onChange={change2fa}
            numInputs={6}
            separator={<span> </span>}
            inputStyle="input-2fa"
            shouldAutoFocus
          />
          <a href="#2fa">I Can’t Access My 2FA</a>
        </>
      )}
    </div>
  );
}

export default TwoFAInput;
