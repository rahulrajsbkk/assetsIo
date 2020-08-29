import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { BankContext } from './Context';

export const PortfolioContext = createContext();

function PortfolioContextProvider({ children }) {
  const { email, token, tostShowOn, profileId } = useContext(BankContext);
  const [loading, setLoading] = useState(false);
  const [loadingCnfrm, setLoadingCnfrm] = useState(false);
  const [coinContract, setCoinContract] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [daysToHold, setDaysToHold] = useState(0);
  const [roiStep, setRoiStep] = useState(0);
  const [dashTab, setDashTab] = useState('Dashboard');
  const [contractPreview, setContractPreview] = useState({});
  const [portfolioSelected, setPortfolioSelected] = useState('Total');

  useEffect(() => {
    switch (durationUnit) {
      case 'Weeks':
        setDaysToHold(duration * 7);
        break;
      case 'Months':
        setDaysToHold(duration * 30);
        break;
      default:
        setDaysToHold(duration);
        break;
    }
  }, [duration, durationUnit]);

  const calculateRoi = () => {
    setLoading(true);
    Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
      email,
      token,
      coin: coinContract,
      days: daysToHold,
      simulate: true,
    })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setContractPreview(data);
          setDashTab('Contracts');
        } else {
          tostShowOn(data.message);
        }
        console.log('data :>> ', data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (dashTab === 'Contracts') {
      calculateRoi();
    }
    // eslint-disable-next-line
  }, [coinContract, daysToHold]);
  const initiate = () => {
    setLoading(true);
    Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
      email,
      token,
      coin: coinContract,
      days: daysToHold,
      simulate: false,
    })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setDashTab('Dashboard');
          setRoiStep(0);
        } else {
          tostShowOn(data.message);
        }
        console.log('data :>> ', data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const confirmContract = () => {
    setLoadingCnfrm(true);
    setTimeout(() => {
      setLoadingCnfrm(false);
      setRoiStep(1);
    }, 2000);
  };

  const [icedContracts, setIcedContracts] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/contract/get?email=${email}`
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setIcedContracts(data.icedContracts);
      }
    });
  }, [email]);

  const [coinBalanceList, setCoinBalanceList] = useState([]);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const getBalances = async () => {
    const resOne = await Axios.post(
      'https://comms.globalxchange.com/coin/vault/service/coins/get',
      {
        app_code: 'ice',
        profile_id: profileId,
      }
    );
    const dataOne = resOne.data;
    setCoinBalanceList(dataOne.coins_data);
    let cryptoBalance = 0;
    let fiatBalance = 0;
    dataOne.coins_data.forEach((coin) => {
      if (coin.type === 'fiat') {
        fiatBalance += coin.coinValueUSD;
      } else if (coin.type === 'crypto') {
        cryptoBalance += coin.coinValueUSD;
      }
    });
    setFiatBalance(fiatBalance);
    setCryptoBalance(cryptoBalance);
  };

  useEffect(() => {
    getBalances();
  }, [profileId]);

  return (
    <PortfolioContext.Provider
      value={{
        coinContract,
        setCoinContract,
        daysToHold,
        setDaysToHold,
        calculateRoi,
        loading,
        dashTab,
        setDashTab,
        confirmContract,
        loadingCnfrm,
        roiStep,
        contractPreview,
        initiate,
        duration,
        setDuration,
        durationUnit,
        setDurationUnit,
        portfolioSelected,
        setPortfolioSelected,
        icedContracts,
        coinBalanceList,
        fiatBalance,
        cryptoBalance,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioContextProvider;
