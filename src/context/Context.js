import React, { createContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Toast from '../components/Toast/Toast';

import allPlatforms from '../static/images/allPlatforms.svg';
import loadImg from '../static/images/load.gif';
import ModalConfirm from '../components/ModalConfirm/ModalConfirm';

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

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  const [videoPlaying, setVideoPlaying] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVideoPlaying(false);
    }, 6000);
  }, []);

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
  const [liquidRates, setLiquidRates] = useState([]);
  useEffect(() => {
    Axios.get(
      'https://comms.globalxchange.com/coin/vault/earnings/getinterestrates'
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setRatesRes(data.rates);
      }
    });
    Axios.get(
      'https://comms.globalxchange.com/coin/iced/get/liquid/interest'
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        const { interest_rates } = data;
        setLiquidRates(interest_rates);
      }
    });
  }, []);

  const [coinList, setCoinList] = useState([]);
  useEffect(() => {
    Axios.post('https://comms.globalxchange.com/coin/vault/service/coins/get', {
      app_code: 'ice',
      profile_id: profileId,
    }).then((res) => {
      const { data } = res;
      if (data.status) {
        const { coins_data } = data;
        coins_data.sort(GetSortOrder('type'));
        setCoinList(coins_data);
      }
    });
  }, [profileId]);

  const [icedContracts, setIcedContracts] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/contract/get?email=${email}`
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        const { icedContracts } = data;
        setIcedContracts(icedContracts);
      }
    });
  }, [email]);

  const [coinListObject, setCoinListObject] = useState({});
  useEffect(() => {
    let coinObj = {};
    coinList.forEach((coin) => {
      coinObj[coin.coinSymbol] = coin;
    });
    setCoinListObject(coinObj);
  }, [coinList]);

  const [coinNameObject, setCoinNameObject] = useState({});
  useEffect(() => {
    let coinObj = {};
    coinList.forEach((coin) => {
      coinObj[coin.coinName] = coin;
    });
    setCoinNameObject(coinObj);
  }, [coinList]);

  const [liquidRatesObject, setLiquidRatesObject] = useState({});
  useEffect(() => {
    let coinObj = {};
    liquidRates.forEach((coin) => {
      coinObj[coin.coin] = coin;
    });
    setLiquidRatesObject(coinObj);
  }, [liquidRates]);

  const [openDefaultCoinSidebar, setOpenDefaultCoinSidebar] = useState(false);
  const [defaultCoin, setDefaultCoin] = useState({
    coin: null,
    name: 'Default Coin',
    img: allPlatforms,
  });
  const convertCoin = (amount, coin) => {
    if (defaultCoin.coin && defaultCoin.coin !== null) {
      return (
        (amount * coinListObject[coin].price.USD) /
        coinListObject[defaultCoin.coin].price.USD
      );
    } else {
      return amount;
    }
  };

  const [footerShow, setFooterShow] = useState(true);

  const [updateInterval, setUpdateInterval] = useState(5);

  // Modal Variables
  const [openModal, setOpenModal] = useState(false);
  const [onClose, setOnClose] = useState(() => {});
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [modalText, setModalText] = useState('');

  const populateModal = (text, onCloseParam, onConfirmParam) => {
    setOpenModal(true);
    setOnClose(() => onCloseParam);
    setOnConfirm(() => onConfirmParam);
    setModalText(text);
  };

  // To Populate List In Sidebar
  const [contentSideBar, setContentSideBar] = useState({});

  // Coin Data For Coin Detail
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    Axios.get('https://comms.globalxchange.com/coin/vault/get/all/coins').then(
      (res) => {
        const { data } = res;
        if (data.status) {
          let coinObj = {};
          data.coins.forEach((coin) => {
            coinObj[coin.coinSymbol] = coin;
          });
          setCoinData(coinObj);
        }
      }
    );
    return () => {};
  }, []);

  const [conractsObj, setConractsObj] = useState({});
  useEffect(() => {
    Axios.get('https://comms.globalxchange.com/coin/iced/admin/get/data').then(
      (res) => {
        const { data } = res;
        if (data.status) {
          const obj = {};
          data.config_data.forEach((config) => {
            obj[config.coin] = { ...obj[config.coin], ...config };
          });
          setConractsObj(obj);
        }
      }
    );
  }, []);

  return (
    <BankContext.Provider
      value={{
        login,
        email,
        token: idToken,
        tostShowOn,
        username,
        name,
        profileImg,
        ratesRes,
        coinList,
        profileId,
        liquidRates,
        liquidRatesObject,
        coinListObject,
        openDefaultCoinSidebar,
        setOpenDefaultCoinSidebar,
        defaultCoin,
        setDefaultCoin,
        convertCoin,
        icedContracts,
        footerShow,
        setFooterShow,
        updateInterval,
        setUpdateInterval,
        populateModal,
        contentSideBar,
        setContentSideBar,
        coinData,
        conractsObj,
        coinNameObject,
      }}
    >
      {children}
      {videoPlaying ? (
        <div className="firstVideo">
          <img src={loadImg} alt="" />
        </div>
      ) : (
        ''
      )}
      {openModal ? (
        <ModalConfirm
          onClose={onClose}
          onConfirm={onConfirm}
          text={modalText}
          setOpenModal={setOpenModal}
        />
      ) : (
        ''
      )}
      <Toast show={toastShow} message={toastMessage} />
    </BankContext.Provider>
  );
}

export default BankContextProvider;
