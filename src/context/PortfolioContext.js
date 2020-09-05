import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { BankContext } from './Context';

export const PortfolioContext = createContext();

const coinZero = {
  AED: 0,
  ARS: 0,
  AUD: 0,
  BTC: 0,
  CAD: 0,
  CNY: 0,
  COP: 0,
  DGP: 0,
  DOGE: 0,
  EOS: 0,
  ETH: 0,
  EUR: 0,
  EWT: 0,
  GBP: 0,
  GXT: 0,
  IDR: 0,
  INR: 0,
  JPY: 0,
  JST: 0,
  LTC: 0,
  MXN: 0,
  MyGXT: 0,
  SEF: 0,
  TRX: 0,
  USD: 0,
  USDT: 0,
  XRP: 0,
};

function PortfolioContextProvider({ children }) {
  const {
    email,
    token,
    tostShowOn,
    profileId,
    coinListObject,
    icedContracts,
  } = useContext(BankContext);
  const [loading, setLoading] = useState(false);
  const [loadingCnfrm, setLoadingCnfrm] = useState(false);
  const [coinContract, setCoinContract] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [daysToHold, setDaysToHold] = useState(0);
  const [roiStep, setRoiStep] = useState(0);
  const [dashTab, setDashTab] = useState('Net-Worth');
  const [contractPreview, setContractPreview] = useState({});
  const [portfolioSelected, setPortfolioSelected] = useState('Total');

  /* To Remove Start */

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
  /* To Remove End */

  const [loadingAppBalance, setLoadingAppBalance] = useState(true);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [userApps, setUserApps] = useState([]);
  const [appBalances, setAppBalances] = useState({});
  const getBalances = async () => {
    setLoadingAppBalance(true);
    const res = await Axios.get(
      `https://comms.globalxchange.com/gxb/apps/registered/user?email=${email}`
    );
    const { data } = res;
    if (data.status) {
      setUserApps(data.userApps);
    }
    const obj = {};
    let totalFiat = 0;
    let totalCrypto = 0;
    for (const index in data.userApps) {
      const appCode = data.userApps[index].app_code;
      const proId = data.userApps[index].profile_id;
      const resOne = await Axios.post(
        'https://comms.globalxchange.com/coin/vault/service/coins/get',
        {
          app_code: appCode,
          profile_id: proId,
        }
      );
      const dataOne = resOne.data;
      let cryptoBalance = 0;
      let fiatBalance = 0;
      dataOne.coins_data.forEach((coin) => {
        if (coin.type === 'fiat') {
          fiatBalance += coin.coinValueUSD;
        } else if (coin.type === 'crypto') {
          cryptoBalance += coin.coinValueUSD;
        }
      });
      totalCrypto += cryptoBalance;
      totalFiat += fiatBalance;
      obj[appCode] = {
        coins_data: dataOne.coins_data,
        cryptoBalance,
        fiatBalance,
        totalBalance: cryptoBalance + fiatBalance,
      };
    }
    setAppBalances(obj);
    setFiatBalance(totalFiat);
    setCryptoBalance(totalCrypto);
    setLoadingAppBalance(false);
  };

  useEffect(() => {
    getBalances();
    // eslint-disable-next-line
  }, [profileId]);

  // Get earnings
  // const [liquidEarningBalances, setLiquidEarningBalances] = useState(); //Not Used
  const [totalUsdEarning, setTotalUsdEarning] = useState(0);
  const [loadingEarnings, setLoadingEarnings] = useState(true);
  // const [contractEarnings, setContractEarnings] = useState({}); //Not Used
  const [loadingBondEarnings, setLoadingBondEarnings] = useState(true);
  const [totalUsdContractEarning, setTotalUsdContractEarning] = useState(0);
  const getEarnings = async () => {
    if (email && coinListObject && coinListObject.BTC) {
      setLoadingEarnings(true);
      const res = await Axios.get(
        `https://comms.globalxchange.com/coin/vault/service/user/app/interest/balances/get?email=${email}`
      );
      const { data } = res;
      if (
        data.status &&
        data.result &&
        data.result[0] &&
        data.result[0].balances
      ) {
        let coins = coinZero;
        let coinBalance = 0;
        data.result[0].balances.forEach((app) => {
          for (const coinSymbol in app.liquid_balances) {
            if (
              coinListObject[coinSymbol] &&
              coinListObject[coinSymbol].price
            ) {
              coinBalance +=
                app.liquid_balances[coinSymbol] *
                coinListObject[coinSymbol].price.USD;
            }
            coins = {
              ...coins,
              [coinSymbol]: app.liquid_balances[coinSymbol] + coins[coinSymbol],
            };
          }
        });
        console.log('coinBalance', coinBalance);
        // setLiquidEarningBalances(coins);
        setTotalUsdEarning(coinBalance);
      } else {
        // setLiquidEarningBalances(coinZero);
        setTotalUsdEarning(0);
      }
      setLoadingEarnings(false);
    }
  };
  useEffect(() => {
    getEarnings();
    setLoadingBondEarnings(true);
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/interest/balances/get?email=${email}`
    )
      .then((res) => {
        const { data } = res;
        let contractEarningUsd;
        if (
          data.status &&
          data.result &&
          data.result[0] &&
          data.result[0].balances &&
          data.result[0].balances[0] &&
          data.result[0].balances[0].iced_balances
        ) {
          // setContractEarnings(data.result[0].balances[0].iced_balances);
          for (const coinSymbol in data.result[0].balances[0].iced_balances) {
            if (
              coinListObject[coinSymbol] &&
              coinListObject[coinSymbol].price
            ) {
              contractEarningUsd +=
                data.result[0].balances[0].iced_balances[coinSymbol] *
                coinListObject[coinSymbol].price.USD;
            }
          }
          setTotalUsdContractEarning(contractEarningUsd);
        } else {
          // setContractEarnings(coinZero);
          setTotalUsdContractEarning(0);
        }
      })
      .finally(() => {
        setLoadingBondEarnings(false);
      });
    // eslint-disable-next-line
  }, [email, coinListObject]);

  const [filterCurrency, setFilterCurrency] = useState('Cryptocurrency');
  const [icingStep, setIcingStep] = useState(0);
  const [icingDays, setIcingDays] = useState(0);
  const [contractCount, setContractCount] = useState(1);
  const [createContractLoading, setCreateContractLoading] = useState(false);

  const [showGrowAssets, setShowGrowAssets] = useState(false);
  const [iceGrowTitle, setIceGrowTitle] = useState('');

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
        fiatBalance,
        cryptoBalance,
        userApps,
        appBalances,
        loadingAppBalance,

        totalUsdEarning,
        loadingEarnings,
        totalUsdContractEarning,
        loadingBondEarnings,

        filterCurrency,
        setFilterCurrency,
        icingStep,
        setIcingStep,
        icingDays,
        setIcingDays,
        contractCount,
        setContractCount,
        createContractLoading,
        setCreateContractLoading,
        showGrowAssets,
        setShowGrowAssets,
        iceGrowTitle,
        setIceGrowTitle,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioContextProvider;
