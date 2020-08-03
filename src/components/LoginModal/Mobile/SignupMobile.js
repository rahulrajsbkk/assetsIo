import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'react-lottie';
import CryptoJS from 'crypto-js';
import OtpInput from 'react-otp-input';
import Fade from 'react-reveal/Fade';
import Axios from 'axios';

import * as animationData from '../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../context/Context';
import unameIcon from '../../../static/images/formIcons/uname.svg';
import emailIcon from '../../../static/images/formIcons/email.svg';
import passwordIcon from '../../../static/images/formIcons/password.svg';

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
const capRegex = new RegExp(/^.*[A-Z].*/);
const numRegex = new RegExp(/^.*[0-9].*/);
const speRegex = new RegExp(/^.*[!@#$%^&*()+=].*/);
const otpRegex = new RegExp(/^\d*$/);

function SignupMobile({ setIsLogin }) {
  const { tostShowOn } = useContext(BankContext);
  const [mailNUnames, setMailNUnames] = useState({
    emails: [],
    usernames: [],
  });
  useEffect(() => {
    Axios.get('https://comms.globalxchange.com/listUsernames').then((res) => {
      const { data } = res;
      if (data.status) {
        let bytes = CryptoJS.Rabbit.decrypt(data.payload, 'gmBuuQ6Er8XqYBd');
        let jsonString = bytes.toString(CryptoJS.enc.Utf8);
        let result_obj = JSON.parse(jsonString);
        setMailNUnames(result_obj);
      }
    });
  }, []);

  const trueCircle = (
    <svg className="eye" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6.5" fill="#002A51" stroke="#2F72AE" />
    </svg>
  );
  const falseCircle = (
    <svg className="eye" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="7" fill="#BE241A" />
    </svg>
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    className: 'carousel-status',
  };

  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState({});
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    setIsValid({
      uname: !mailNUnames.usernames.includes(uname) && uname.length > 3,
      email: emailRegex.test(email) && !mailNUnames.emails.includes(email),
      password:
        capRegex.test(password) &&
        numRegex.test(password) &&
        speRegex.test(password) &&
        password.length >= 8,
      confirmPassword: confirmPassword === password,
      pin: String(pin).length === 6,
    });
  }, [uname, email, password, confirmPassword, pin, mailNUnames]);

  const uNameValidate = (e) => {
    const { value } = e.target;
    setUname(value.trim().toLowerCase());
  };

  const emailValidate = (e) => {
    const { value } = e.target;
    setEmail(value.trim().toLowerCase());
  };

  const passwordValidate = (e) => {
    const { value } = e.target;
    setPassword(value.trim());
  };

  const validateCnfrmPaswd = (e) => {
    const { value } = e.target;
    setConfirmPassword(value.trim());
  };
  const pinValidator = (pinStr) => {
    if (otpRegex.test(pinStr)) setPin(pinStr);
  };

  const [loading, setLoading] = useState();

  const signUp = () => {
    Axios.post('https://gxauth.apimachine.com/gx/user/signup', {
      username: uname,
      email: email,
      password: password,
      ref_affiliate: '1',
      account_type: 'Personal',
      signedup_app: 'IcedVault',
    })
      .then((res) => {
        if (!res.data.status) {
          tostShowOn(res.data.message);
          setStep(0);
        }
      })
      .catch((err) => {
        tostShowOn(err.message);
        setStep(0);
      });
  };

  const verifyEmail = () => {
    setLoading(true);
    Axios.post('https://gxauth.apimachine.com/gx/user/confirm', {
      email: email,
      code: pin,
    })
      .then((res) => {
        const { data } = res;
        if (!data.status) {
          setStep(3);
          tostShowOn(data.message);
        } else {
          setTimeout(() => {
            setIsLogin(true);
          }, 1000);
        }
      })
      .catch((err) => {
        setStep(3);
        tostShowOn(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <Fade bottom>
              <div className="group">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  name="password"
                  required="required"
                  value={password}
                  onChange={passwordValidate}
                  placeholder="ENTER PASSWORD"
                />
              </div>
              <div className="conditions">
                <h3>The Password Checklist</h3>
                <div className="item">
                  Should be 8 charectors
                  {password.length >= 8 ? trueCircle : falseCircle}
                </div>
                <div className="item">
                  Contains Atleast One Capital Letter
                  {capRegex.test(password) ? trueCircle : falseCircle}
                </div>
                <div className="item">
                  Contains Atleast One Number
                  {numRegex.test(password) ? trueCircle : falseCircle}
                </div>
                <div className="item">
                  Contains Atleast One Special Charector
                  {speRegex.test(password) ? trueCircle : falseCircle}
                </div>
              </div>
            </Fade>
            <Fade bottom>
              <button
                type="submit"
                disabled={!isValid.password}
                className="btn btn-next"
                onClick={() => {
                  if (isValid.password) setStep(2);
                }}
              >
                Confirm Password
              </button>
            </Fade>
          </>
        );
      case 2:
        return (
          <>
            <Fade bottom>
              <label className="group">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  name="password"
                  value={confirmPassword}
                  onChange={validateCnfrmPaswd}
                  required="required"
                  placeholder="TYPE PASSWORD AGAIN"
                />
                {isValid.confirmPassword ? trueCircle : falseCircle}
              </label>
            </Fade>
            <Fade bottom>
              <button
                type="submit"
                disabled={!isValid.confirmPassword}
                className="btn btn-next"
                onClick={() => {
                  if (isValid.confirmPassword) {
                    setStep(3);
                    signUp();
                  }
                }}
              >
                Confirm Password
              </button>
            </Fade>
          </>
        );
      case 3:
        return (
          <>
            <Fade bottom>
              <div className="otp-group">
                <div className="text">
                  Enter The 6ix Digit Confirmation Code Was Just Sent To&nbsp;
                  <b>{email}</b>
                </div>
                <OtpInput
                  containerStyle="otp-input-wrapper"
                  value={pin}
                  onChange={(otp) => pinValidator(otp)}
                  numInputs={6}
                  separator={<span> </span>}
                  inputStyle="otp-input"
                />
              </div>
            </Fade>
            <Fade bottom>
              <button
                type="submit"
                disabled={!isValid.pin}
                className="btn btn-next final"
                onClick={() => {
                  if (isValid.pin) {
                    setStep(4);
                    verifyEmail();
                  }
                }}
              >
                Complete Registration
              </button>
            </Fade>
          </>
        );
      case 4:
        return (
          <div className="signUpLottie">
            <div className="lottie">
              <Lottie
                className="carousel-status"
                options={defaultOptions}
                height={150}
                width={150}
              />
            </div>
            {loading ? (
              <h6>Creating Your Account</h6>
            ) : (
              <h6>Congraulations, You Are Now A GX Member</h6>
            )}
          </div>
        );
      default:
        return (
          <>
            <Fade bottom>
              <label className="group">
                <img src={unameIcon} alt="" />
                <input
                  type="text"
                  name="uname"
                  value={uname}
                  onChange={uNameValidate}
                  required="required"
                  placeholder="SELECT USERNAME"
                />
                {isValid.uname ? trueCircle : falseCircle}
              </label>
            </Fade>
            <Fade bottom>
              <label className="group">
                <img src={emailIcon} alt="" />
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={emailValidate}
                  required="required"
                  placeholder="ENTER EMAIL"
                />
                {isValid.email ? trueCircle : falseCircle}
              </label>
            </Fade>
            <Fade bottom>
              <button
                type="submit"
                disabled={!(isValid.email && isValid.uname)}
                className="btn btn-next"
                onClick={() => {
                  if (isValid.email && isValid.uname) {
                    setStep(1);
                  }
                }}
              >
                NEXT STEP
              </button>
            </Fade>
          </>
        );
    }
  };
  return (
    <div className="mobileLogin">
      <div className="login-enter">
        <div className="main-text">Register</div>
        <div className="sub-text">Step 1: Email & Username</div>
        <div className="stepContent">{getStep(step)}</div>
      </div>
      <div className="bottomBtn" onClick={() => setIsLogin(true)}>
        {step === 4 && !loading ? 'Login Now' : 'I Already Have An Account'}
      </div>
    </div>
  );
}

export default SignupMobile;
