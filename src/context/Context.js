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

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    function getUserData() {
      Axios.post('https://comms.globalxchange.com/get_affiliate_data_no_logs', {
        email: email,
      }).then((res) => {
        const data = res.data[0];
        if (data) {
          setUsername(data.username);
          setName(data.name);
          setProfileImg(data.profile_img);
        }
      });
      Axios.get(
        `https://comms.globalxchange.com/user/details/get?email=${email}`
      ).then((res) => {
        const { data } = res;
        if (data.status) {
          setProfileId(data.user.ice_profile_id);
        }
      });
    }
    if (email && idToken) {
      Axios.post('https://comms.globalxchange.com/coin/verifyToken', {
        email,
        token: idToken,
      }).then((res) => (res.data.status ? getUserData() : login('', '', '')));
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

  const [ratesRes, setRatesRes] = useState([]);
  useEffect(() => {
    Axios.get(
      'https://comms.globalxchange.com/coin/vault/earnings/getinterestrates'
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setRatesRes(data.rates);
      }
    });
  }, []);

  const [coinList, setCoiList] = useState([]);
  useEffect(() => {
    Axios.post('https://comms.globalxchange.com/coin/vault/service/coins/get', {
      app_code: 'ice',
    }).then((res) => {
      const { data } = res;
      if (data.status) {
        setCoiList(data.coins_data);
      }
    });
  }, []);
  return (
    <BankContext.Provider
      value={{
        login,
        email,
        tostShowOn,
        username,
        name,
        profileImg,
        ratesRes,
        coinList,
        profileId,
      }}
    >
      {children}
      <Toast show={toastShow} message={toastMessage} />
    </BankContext.Provider>
  );
}

export default BankContextProvider;
