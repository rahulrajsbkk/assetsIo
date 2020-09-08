import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import * as d3 from 'd3';
import { BankContext } from './Context';

export const NetWorthContext = createContext();

function NetWorthContextProvider({ children }) {
  const colors = d3.scaleOrdinal(d3.schemeTableau10);

  const { email, coinListObject } = useContext(BankContext);

  const [loadingAppBalance, setLoadingAppBalance] = useState(true);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [userApps, setUserApps] = useState([]);
  const [appBalances, setAppBalances] = useState({});

  const mainCards = [
    {
      name: 'Cryptocurrency',
      value: cryptoBalance,
      color: colors(0),
      percent: (cryptoBalance / (cryptoBalance + fiatBalance)) * 100,
      assets:
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data &&
        appBalances.total.coins_data.filter((coin) => coin.type === 'crypto')
          .length,
      type: 'asset_class',
    },
    {
      name: 'Fiat Currencies',
      value: fiatBalance,
      color: colors(1),
      percent: (fiatBalance / (cryptoBalance + fiatBalance)) * 100,
      assets:
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data &&
        appBalances.total.coins_data.filter((coin) => coin.type === 'fiat')
          .length,
      type: 'asset_class',
    },
    {
      name: 'Funds',
      value: 0,
      color: colors(2),
    },
    {
      name: 'Loans',
      value: 0,
      color: colors(3),
    },
    {
      name: 'Real Estate',
      value: 0,
      color: colors(4),
    },
    {
      name: 'Private Equity',
      value: 0,
      color: colors(5),
    },
    {
      name: 'Digital Properties',
      value: 0,
      color: colors(6),
    },
    {
      name: 'Influence',
      value: 0,
      color: colors(7),
    },
  ];

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
    obj.total = {
      coins_data: false,
      cryptoBalance: 0,
      fiatBalance: 0,
      totalBalance: 0,
    };
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
      let coinsData = [];
      if (obj.total.coins_data) {
        obj.total.coins_data.forEach((element, i) => {
          coinsData.push({
            ...element,
            coinValue: dataOne.coins_data[i].coinValue + element.coinValue,
            coinValueUSD:
              dataOne.coins_data[i].coinValueUSD + element.coinValueUSD,
          });
        });
      }
      obj.total = {
        coins_data: obj.total.coins_data ? coinsData : dataOne.coins_data,
        cryptoBalance: obj.total.cryptoBalance + cryptoBalance,
        fiatBalance: obj.total.fiatBalance + fiatBalance,
        totalBalance: obj.total.totalBalance + cryptoBalance + fiatBalance,
      };
      console.log('obj', obj);
    }
    setAppBalances(obj);
    setFiatBalance(totalFiat);
    setCryptoBalance(totalCrypto);
    setLoadingAppBalance(false);
  };

  useEffect(() => {
    getBalances();
  }, [email]);

  const [assetClass, setAssetClass] = useState(null);
  const [assetCoin, setAssetCoin] = useState(null);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    setCardList(mainCards);
  }, [fiatBalance, cryptoBalance, appBalances]);

  useEffect(() => {
    if (assetCoin) {
      let arr = [];
      userApps.forEach((app, i) => {
        console.log('appBalances[app.app_code]', appBalances[app.app_code]);
        arr.push({
          img: app.app_logo,
          name: app.app_name,
          value: appBalances[app.app_code].coins_data.filter(
            (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
          )[0].coinValueUSD,
          color: colors(i),
          percent:
            (appBalances[app.app_code].coins_data.filter(
              (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
            )[0].coinValueUSD /
              appBalances.total.coins_data.filter(
                (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
              )[0].coinValueUSD) *
            100,
          type: 'coin',
        });
      });
      setCardList(arr);
    } else if (assetClass) {
      if (
        assetClass === 'Cryptocurrency' &&
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data
      ) {
        let arr = [];
        appBalances.total.coins_data
          .filter((coin) => coin.type === 'crypto')
          .forEach((coin, i) => {
            arr.push({
              img: coin.coinImage,
              name: coin.coinName,
              value: coin.coinValueUSD,
              color: colors(i),
              percent: (coin.coinValueUSD / cryptoBalance) * 100,
              type: 'coin',
            });
          });
        setCardList(arr);
      } else if (
        assetClass === 'Fiat Currencies' &&
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data
      ) {
        let arr = [];
        appBalances.total.coins_data
          .filter((coin) => coin.type === 'fiat')
          .forEach((coin, i) => {
            arr.push({
              img: coin.coinImage,
              name: coin.coinName,
              value: coin.coinValueUSD,
              color: colors(i),
              percent: (coin.coinValueUSD / cryptoBalance) * 100,
              type: 'coin',
            });
          });
        setCardList(arr);
      }
    } else {
      setCardList(mainCards);
    }
  }, [assetClass, appBalances, assetCoin]);
  return (
    <NetWorthContext.Provider
      value={{
        loadingAppBalance, //Show Balance In Loading State
        fiatBalance,
        cryptoBalance,
        appBalances,
        cardList,
        assetClass,
        setAssetClass,
        assetCoin,
        setAssetCoin,
      }}
    >
      {children}
    </NetWorthContext.Provider>
  );
}

export default NetWorthContextProvider;
