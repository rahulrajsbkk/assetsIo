import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'react-lottie';
import CryptoJS from 'crypto-js';
import OtpInput from 'react-otp-input';
import Fade from 'react-reveal/Fade';
import * as animationData from '../../static/animations/cpu-loading.json';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../../context/Context';

const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
const capRegex = new RegExp(/^.*[A-Z].*/);
const numRegex = new RegExp(/^.*[0-9].*/);
const speRegex = new RegExp(/^.*[!@#$%^&*()+=].*/);
const otpRegex = new RegExp(/^\d*$/);

function Signup({ setFirstLogin, onClose }) {
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
    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6.5" fill="#002A51" stroke="#2F72AE" />
    </svg>
  );
  const falseCircle = (
    <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
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
  const [refAffiliate, setRefAffiliate] = useState('');

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
      ref_affiliate: refAffiliate || 1,
      account_type: 'Personal',
      signedup_app: 'ice',
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
            setFirstLogin(true);
          }, 2000);
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
          <div className="signup-form d-flex flex-column flex-grow-1 mx-5">
            <Fade bottom>
              <div className="group">
                <input
                  type="text"
                  name="uname"
                  value={uname}
                  onChange={uNameValidate}
                  required="required"
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Select Username</label>
                {isValid.uname ? trueCircle : falseCircle}
              </div>
            </Fade>
            <Fade bottom>
              <div className="group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={emailValidate}
                  required="required"
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Enter Email</label>
                {isValid.email ? trueCircle : falseCircle}
              </div>
            </Fade>
            <Fade bottom>
              <div className="group ">
                <button
                  type="submit"
                  disabled={!(isValid.email && isValid.uname)}
                  className="btn btn-darkblue mb-5"
                  onClick={() => {
                    if (isValid.email && isValid.uname) {
                      setStep(2);
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            </Fade>
          </div>
        );
      case 2:
        return (
          <div className="signup-form mx-5">
            <Fade bottom>
              <div className="group">
                <input
                  type="password"
                  name="password"
                  required="required"
                  value={password}
                  onChange={passwordValidate}
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Enter Password</label>
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
              <div className="group">
                <button
                  type="submit"
                  disabled={!isValid.password}
                  className="btn btn-darkblue mb-5"
                  onClick={() => {
                    if (isValid.password) setStep(2);
                  }}
                >
                  Confirm Password
                </button>
              </div>
            </Fade>
          </div>
        );
      case 3:
        return (
          <div className="d-flex flex-column signup-form mx-5 flex-grow-1">
            <Fade bottom>
              <div className="group my-auto">
                <input
                  type="password"
                  name="password"
                  value={confirmPassword}
                  onChange={validateCnfrmPaswd}
                  required="required"
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Type Password Again</label>
                {isValid.confirmPassword ? trueCircle : falseCircle}
              </div>
            </Fade>
            <Fade bottom>
              <div className="group">
                <button
                  type="submit"
                  disabled={!isValid.confirmPassword}
                  className="btn btn-darkblue mb-5"
                  onClick={() => {
                    if (isValid.confirmPassword) {
                      setStep(3);
                      signUp();
                    }
                  }}
                >
                  Confirm Password
                </button>
              </div>
            </Fade>
          </div>
        );
      case 4:
        return (
          <div className="d-flex flex-column signup-form mx-5 flex-grow-1">
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
              <div className="group">
                <button
                  type="submit"
                  disabled={!isValid.pin}
                  className="btn btn-darkblue mb-5"
                  onClick={() => {
                    if (isValid.pin) {
                      setStep(4);
                      verifyEmail();
                    }
                  }}
                >
                  Complete Registration
                </button>
              </div>
            </Fade>
          </div>
        );
      case 5:
        return (
          <div className="d-flex flex-column signup-form mx-5 flex-grow-1">
            <div className="lottie">
              {loading ? (
                <>
                  <Lottie
                    className="carousel-status"
                    options={defaultOptions}
                    height={150}
                    width={150}
                  />
                  <h6>Creating Your Account</h6>
                </>
              ) : (
                <h6>Congraulations, You Are Now A Assets.io Member</h6>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="signup-form d-flex flex-column flex-grow-1 mx-5">
            <Fade bottom>
              <div className="group my-auto">
                <input
                  type="text"
                  name="uname"
                  value={refAffiliate}
                  onChange={(e) => setRefAffiliate(e.target.value)}
                  required="required"
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Enter BrokerSync Code</label>
                <div className="whatIs">What Is A BrokerSync Code?</div>
              </div>
            </Fade>
            <Fade bottom>
              <div className="group mt-0 mb-5">
                <button
                  type="submit"
                  className="btn btn-darkblue"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Continue
                </button>
              </div>
            </Fade>
          </div>
        );
    }
  };
  return (
    <div className="card signup">
      <FontAwesomeIcon
        icon={faTimes}
        className="close-btn mt-5 mr-5"
        onClick={() => {
          // setRequireLogin();
          try {
            onClose();
          } catch (error) {}
        }}
      />
      <h2 className="mt-5 mb-0 mx-5 signup-text">Signup</h2>
      <div className="gx-account-text mx-5">Create Your Account In Seconds</div>
      {getStep(step)}
    </div>
  );
}

export default Signup;
