import React, { createContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Toast from '../components/Toast/Toast';

export const BankContext = createContext();

function BankContextProvider({ children }) {
  const [email, setEmail] = useState(
    localStorage.getItem('nvestBankLoginAccount') || ''
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('nvestBankAccessToken') || ''
  );
  const [idToken, setIdToken] = useState(
    localStorage.getItem('nvestBankIdToken') || ''
  );

  useEffect(() => {
    localStorage.setItem('nvestBankLoginAccount', email);
  }, [email]);
  useEffect(() => {
    localStorage.setItem('nvestBankAccessToken', accessToken);
  }, [accessToken]);
  useEffect(() => {
    localStorage.setItem('nvestBankIdToken', idToken);
  }, [idToken]);

  const login = (paramEmail, paramAccessToken, paramIdToken) => {
    setEmail(paramEmail);
    setAccessToken(paramAccessToken);
    setIdToken(paramIdToken);
  };

  useEffect(() => {
    if (email && idToken) {
      Axios.post('https://comms.globalxchange.com/coin/verifyToken', {
        email,
        token: idToken,
      }).then((res) => (res.data.status ? '' : login('', '', '')));
    }
  }, [email, idToken]);

  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const tostShowOn = (message) => {
    setToastShow(true);
    setToastMessage(message);
    setTimeout(() => {
      setToastShow(false);
    }, 3000);
  };

  return (
    <BankContext.Provider value={{ login, email, tostShowOn }}>
      {children}
      <Toast show={toastShow} message={toastMessage} />
    </BankContext.Provider>
  );
}

export default BankContextProvider;
