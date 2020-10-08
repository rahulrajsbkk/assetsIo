import React, { useState } from 'react';
import { useEffect } from 'react';
import OtpInput from 'react-otp-input';
import logo from '../../static/images/assetsLogo.svg';

const otpRegex = new RegExp(/^\d*$/);
function EnterPinUnlock({ onSucces, onClose }) {
  const [pin, setPin] = useState('');
  const pinValidator = (pinStr) => {
    if (otpRegex.test(pinStr)) setPin(pinStr);
  };
  useEffect(() => {
    if (pin === '4151') {
      try {
        onSucces();
      } catch (error) {}
    }
  }, [pin]);
  return (
    <div className="enterPinUnlock">
      <div
        className="overlayClose"
        onClick={() => {
          try {
            onClose();
          } catch (error) {}
        }}
      />
      <div className="pinCard">
        <img src={logo} alt="" className="logo" />
        <div className="title">Enter VIP Pin</div>
        <OtpInput
          containerStyle="otp-input-wrapper"
          value={pin}
          onChange={(otp) => pinValidator(otp)}
          numInputs={4}
          separator={<span> </span>}
          inputStyle="otp-input"
        />
        <div
          className="btnCloseFooter"
          onClick={() => {
            try {
              onClose();
            } catch (error) {}
          }}
        >
          Close
        </div>
      </div>
    </div>
  );
}

export default EnterPinUnlock;
