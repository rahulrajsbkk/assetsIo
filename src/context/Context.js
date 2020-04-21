import React, { createContext, useEffect, useState } from 'react';

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
  return (
    <BankContext.Provider value={{ login, email }}>
      {children}
    </BankContext.Provider>
  );
}

export default BankContextProvider;
