import React, { createContext, useState, useContext, useEffect } from 'react';
import { BankContext } from './Context';
import Axios from 'axios';

export const EarningsContext = createContext();

function EarningsContextProvider({ children }) {
  const { email, coinList } = useContext(BankContext);
  const [coinSelected, setCoinSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [liquidOrBond, setLiquidOrBond] = useState('Liquid');
  const [appSelected, setAppSelected] = useState(null);

  useEffect(() => {
    const btcArray = coinList.filter((coin) => coin.coinSymbol === 'BTC');
    setCoinSelected(btcArray[0]);
  }, [coinList]);

  const [liquidEarningBalances, setLiquidEarningBalances] = useState({});
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/user/app/interest/balances/get?email=${email}${
        appSelected ? `&app_code=${appSelected}` : ''
      }`
    )
      .then((res) => {
        const { data } = res;
        if (
          data.status &&
          data.result &&
          data.result[0] &&
          data.result[0].balances
        ) {
          let coins = {
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
          data.result[0].balances.forEach((app) => {
            for (const coinSymbol in app.liquid_balances) {
              coins = {
                ...coins,
                [coinSymbol]:
                  app.liquid_balances[coinSymbol] + coins[coinSymbol],
              };
            }
            setLiquidEarningBalances(coins);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, appSelected]);

  const [earnTransactions, setEarnTransactions] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (email && coinSelected && coinSelected.coinSymbol)
      Axios.get(
        `https://comms.globalxchange.com/coin/vault/service/user/app/interest/logs/get?&email=${email}&coin=${
          coinSelected.coinSymbol
        }${appSelected ? `&app_code=${appSelected}` : ''}`
      )
        .then((res) => {
          const { data } = res;
          console.log('data.logs', data.logs);
          if (data.status) {
            setEarnTransactions(
              data.logs && data.logs[0] ? data.logs[0].logs : []
            );
          }
        })
        .finally(() => setLoading(false));
  }, [email, coinSelected, appSelected]);

  const [userApps, setUserApps] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/gxb/apps/registered/user?email=${email}`
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setUserApps(data.userApps);
      }
    });
    return () => {};
  }, [email]);

  const [dateSelected, setDateSelected] = useState(null);

  return (
    <EarningsContext.Provider
      value={{
        coinList,
        coinSelected,
        setCoinSelected,
        loading,
        dateSelected,
        setDateSelected,
        liquidEarningBalances,
        earnTransactions,

        liquidOrBond,
        setLiquidOrBond,
        userApps,
        appSelected,
        setAppSelected,
      }}
    >
      {children}
    </EarningsContext.Provider>
  );
}

export default EarningsContextProvider;
