import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import * as d3 from 'd3';
import { BankContext } from './Context';
import assetLogo from '../static/images/assetsLogo.svg';

export const NetWorthContext = createContext();

function NetWorthContextProvider({ children }) {
  const colors = d3.scaleOrdinal(d3.schemeTableau10);

  const { email, coinListObject, icedContracts, coinNameObject } = useContext(
    BankContext
  );
  const [loadingAppBalance, setLoadingAppBalance] = useState(true);
  const [fiatBalance, setFiatBalance] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [userApps, setUserApps] = useState([]);
  const [appBalances, setAppBalances] = useState({});

  const [icedValues, setIcedValues] = useState({
    crypto: {
      value: 0,
      count: 0,
    },
    fiat: {
      value: 0,
      count: 0,
    },
  });

  useEffect(() => {
    let contractsVal = {};
    contractsVal.crypto = {
      value: 0,
      count: 0,
    };
    contractsVal.fiat = {
      value: 0,
      count: 0,
    };
    icedContracts.forEach((contract) => {
      if (coinListObject && coinListObject[contract._id]) {
        let totalContractVoc = 0;
        contract.contracts.forEach((contr) => {
          totalContractVoc += contr.voc_usd;
        });
        if (coinListObject[contract._id].type === 'crypto') {
          contractsVal.crypto.value =
            contractsVal.crypto.value + totalContractVoc;
          contractsVal.crypto.count =
            contractsVal.crypto.count + contract.count;
          contractsVal.crypto[contract._id] = {};
          contractsVal.crypto[contract._id].value = totalContractVoc;
          contractsVal.crypto[contract._id].contracts = contract.contracts;
        } else {
          contractsVal.fiat.value = contractsVal.fiat.value + totalContractVoc;
          contractsVal.fiat.count = contractsVal.fiat.count + contract.count;
          contractsVal.fiat[contract._id] = {};
          contractsVal.fiat[contract._id].value = totalContractVoc;
          contractsVal.fiat[contract._id].contracts = contract.contracts;
        }
      }
    });
    setIcedValues(contractsVal);
  }, [icedContracts, coinListObject]);

  const mainCards = [
    {
      name: 'Cryptocurrency',
      value: cryptoBalance + icedValues.crypto.value,
      color: colors(0),
      percent:
        ((cryptoBalance + icedValues.crypto.value) /
          (cryptoBalance +
            fiatBalance +
            icedValues.crypto.value +
            icedValues.fiat.value)) *
        100,
      assets:
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data &&
        appBalances.total.coins_data.filter((coin) => coin.type === 'crypto')
          .length,
      assetText: 'Assets',
      type: 'asset_class',
    },
    {
      name: 'Fiat Currencies',
      value: fiatBalance,
      color: colors(1),
      percent:
        ((fiatBalance + icedValues.fiat.value) /
          (cryptoBalance +
            fiatBalance +
            icedValues.crypto.value +
            icedValues.fiat.value)) *
        100,
      assets:
        appBalances &&
        appBalances.total &&
        appBalances.total.coins_data &&
        appBalances.total.coins_data.filter((coin) => coin.type === 'fiat')
          .length,
      assetText: 'Assets',
      type: 'asset_class',
    },
    {
      name: 'Funds',
      value: 0,
      color: colors(2),
      assetText: 'Assets',
      type: 'coming_soon',
    },
    {
      name: 'Loans',
      value: 0,
      color: colors(3),
      assetText: 'Assets',
      type: 'coming_soon',
    },
    {
      name: 'Real Estate',
      value: 0,
      color: colors(4),
      assetText: 'Assets',
      type: 'coming_soon',
    },
    {
      name: 'Private Equity',
      value: 0,
      color: colors(5),
      assetText: 'Assets',
      type: 'coming_soon',
    },
    {
      name: 'Digital Properties',
      value: 0,
      color: colors(6),
      assetText: 'Assets',
      type: 'coming_soon',
    },
    {
      name: 'Influence',
      value: 0,
      color: colors(7),
      assetText: 'Assets',
      type: 'coming_soon',
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
      if (dataOne && dataOne.coins_data && Array.isArray(dataOne.coins_data))
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
        coins_data:
          dataOne && dataOne.coins_data && Array.isArray(dataOne.coins_data)
            ? dataOne.coins_data
            : [],
        cryptoBalance,
        fiatBalance,
        totalBalance: cryptoBalance + fiatBalance,
      };
      let coinsData = [];
      if (obj.total.coins_data) {
        obj.total.coins_data.forEach((element, i) => {
          coinsData.push({
            ...element,
            coinValue:
              ((dataOne &&
                dataOne.coins_data &&
                dataOne.coins_data[i] &&
                dataOne.coins_data[i].coinValue) ||
                0) + element.coinValue,
            coinValueUSD:
              ((dataOne &&
                dataOne.coins_data &&
                dataOne.coins_data[i] &&
                dataOne.coins_data[i].coinValueUSD) ||
                0) + element.coinValueUSD,
          });
        });
      }
      obj.total = {
        coins_data: obj.total.coins_data ? coinsData : dataOne.coins_data,
        cryptoBalance: obj.total.cryptoBalance + cryptoBalance,
        fiatBalance: obj.total.fiatBalance + fiatBalance,
        totalBalance: obj.total.totalBalance + cryptoBalance + fiatBalance,
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
  }, [email]);

  const [assetClass, setAssetClass] = useState(null);
  const [assetCoin, setAssetCoin] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [selectedTotalBalance, setSelectedTotalBalance] = useState(0);

  useEffect(() => {
    if (liquidity) {
      if (liquidity === 'Liquid') {
        let arr = [];
        userApps.forEach((app, i) => {
          arr.push({
            img: app.app_logo,
            name: app.app_name,
            value:
              (appBalances[app.app_code].coins_data.filter(
                (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
              ) &&
                appBalances[app.app_code].coins_data.filter(
                  (coin) =>
                    coinListObject[coin.coinSymbol].coinName === assetCoin
                )[0] &&
                appBalances[app.app_code].coins_data.filter(
                  (coin) =>
                    coinListObject[coin.coinSymbol].coinName === assetCoin
                )[0].coinValueUSD) ||
              0,
            color: colors(i),
            percent:
              ((appBalances[app.app_code].coins_data.filter(
                (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
              ) &&
                appBalances[app.app_code].coins_data.filter(
                  (coin) =>
                    coinListObject[coin.coinSymbol].coinName === assetCoin
                )[0] &&
                appBalances[app.app_code].coins_data.filter(
                  (coin) =>
                    coinListObject[coin.coinSymbol].coinName === assetCoin
                )[0].coinValueUSD) ||
                0 /
                  appBalances.total.coins_data.filter(
                    (coin) =>
                      coinListObject[coin.coinSymbol].coinName === assetCoin
                  )[0].coinValueUSD) * 100,
            type: 'app',
            assetText: 'GX Vault',
          });
        });
        setCardList(arr);
        setSelectedTotalBalance(
          appBalances.total.coins_data.filter(
            (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
          )[0].coinValueUSD
        );
      } else {
        let arr = [];
        icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
          coinNameObject[assetCoin].coinSymbol
        ].contracts.forEach((contract, i) => {
          arr.push({
            img: assetLogo,
            name: 'Assets.io',
            value: contract.voc_usd,
            color: colors(i),
            percent:
              (contract.voc_usd /
                icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                  coinNameObject[assetCoin].coinSymbol
                ].value) *
              100,
            type: 'app',
            assets: contract.days,
            assetText: 'Day Bond',
          });
        });
        setCardList(arr);
        setSelectedTotalBalance(
          icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
            coinNameObject[assetCoin].coinSymbol
          ].value
        );
      }
    } else if (assetCoin) {
      let arr = [
        {
          name: 'Liquid',
          value: appBalances.total.coins_data.filter(
            (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
          )[0].coinValueUSD,
          color: colors(0),
          percent:
            (appBalances.total.coins_data.filter(
              (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
            )[0].coinValueUSD /
              (appBalances.total.coins_data.filter(
                (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
              )[0].coinValueUSD +
                ((icedValues[
                  assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                ] &&
                  icedValues[
                    assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                  ][coinNameObject[assetCoin].coinSymbol] &&
                  icedValues[
                    assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                  ][coinNameObject[assetCoin].coinSymbol].value) ||
                  0))) *
            100,
          type: 'liquidity',
          assets: userApps.length,
          assetText: 'Wallets',
        },
        {
          name: 'Bonds',
          value:
            (icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ].value) ||
            0,
          color: colors(1),
          percent:
            (((icedValues[
              assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
            ] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ].value) ||
              0) /
              (appBalances.total.coins_data.filter(
                (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
              )[0].coinValueUSD +
                ((icedValues[
                  assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                ] &&
                  icedValues[
                    assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                  ][coinNameObject[assetCoin].coinSymbol] &&
                  icedValues[
                    assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'
                  ][coinNameObject[assetCoin].coinSymbol].value) ||
                  0))) *
            100,
          type: 'liquidity',
          assets:
            (icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol.contracts
              ] &&
              icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
                coinNameObject[assetCoin].coinSymbol
              ].contracts.length) ||
            0,
          assetText: 'Bonds',
        },
      ];
      setCardList(arr);
      setSelectedTotalBalance(
        appBalances.total.coins_data.filter(
          (coin) => coinListObject[coin.coinSymbol].coinName === assetCoin
        )[0].coinValueUSD +
          ((icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'] &&
            icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
              coinNameObject[assetCoin].coinSymbol
            ] &&
            icedValues[assetClass === 'Cryptocurrency' ? 'crypto' : 'fiat'][
              coinNameObject[assetCoin].coinSymbol
            ].value) ||
            0)
      );
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
              value:
                coin.coinValueUSD +
                ((icedValues.crypto[coin.coinSymbol] &&
                  icedValues.crypto[coin.coinSymbol].value) ||
                  0),
              color: colors(i),
              percent:
                ((coin.coinValueUSD +
                  ((icedValues.crypto[coin.coinSymbol] &&
                    icedValues.crypto[coin.coinSymbol].value) ||
                    0)) /
                  (cryptoBalance + icedValues.crypto.value)) *
                100,
              type: 'coin',
              assets: 2,
              assetText: 'Liquidity Profiles',
            });
          });
        setCardList(arr);
        setSelectedTotalBalance(cryptoBalance + icedValues.crypto.value);
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
              value:
                coin.coinValueUSD +
                ((icedValues.fiat[coin.coinSymbol] &&
                  icedValues.fiat[coin.coinSymbol].value) ||
                  0),
              color: colors(i),
              percent:
                ((coin.coinValueUSD +
                  ((icedValues.fiat[coin.coinSymbol] &&
                    icedValues.fiat[coin.coinSymbol].value) ||
                    0)) /
                  (fiatBalance + icedValues.fiat.value)) *
                100,
              type: 'coin',
              assets: 2,
              assetText: 'Liquidity Profiles',
            });
          });
        setCardList(arr);
        setSelectedTotalBalance(fiatBalance + icedValues.fiat.value);
      }
    } else {
      setCardList(mainCards);
      setSelectedTotalBalance(
        fiatBalance +
          cryptoBalance +
          icedValues.crypto.value +
          icedValues.fiat.value
      );
    }
    // eslint-disable-next-line
  }, [
    assetClass,
    appBalances,
    assetCoin,
    liquidity,
    fiatBalance,
    cryptoBalance,
    icedValues,
    coinListObject,
    coinNameObject,
    cryptoBalance,
    fiatBalance,
    icedValues,
    userApps,
  ]);

  const [tabData, setTabData] = useState({
    key: {
      assetClass,
      assetCoin,
      liquidity,
    },
  });
  const [tabIndex, setTabIndex] = useState('key');
  useEffect(() => {
    setTabData({
      ...tabData,
      [tabIndex]: {
        assetClass,
        assetCoin,
        liquidity,
      },
    });
    // eslint-disable-next-line
  }, [assetClass, assetCoin, liquidity]);

  return (
    <NetWorthContext.Provider
      value={{
        totalBalance:
          fiatBalance +
          cryptoBalance +
          icedValues.crypto.value +
          icedValues.fiat.value,
        loadingAppBalance, //Show Balance In Loading State
        fiatBalance,
        cryptoBalance,
        appBalances,
        cardList,
        assetClass,
        setAssetClass,
        assetCoin,
        setAssetCoin,
        liquidity,
        setLiquidity,
        icedValues,
        selectedTotalBalance,
        tabData,
        setTabData,
        tabIndex,
        setTabIndex,
        userApps,
      }}
    >
      {children}
    </NetWorthContext.Provider>
  );
}

export default NetWorthContextProvider;
