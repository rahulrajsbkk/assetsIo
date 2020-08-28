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
        console.log('data.result', data.result);
        if (
          data.status &&
          data.result &&
          data.result[0] &&
          data.result[0].balances &&
          data.result[0].balances[0]
        ) {
          setLiquidEarningBalances(
            appSelected
              ? data.result[0].balances.filter(
                  (bal) => bal.app_code === appSelected
                )[0].liquid_balances
              : data.result[0].balances[0].liquid_balances
          );
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
          if (data.status && data.logs && data.logs[0]) {
            setEarnTransactions(
              appSelected
                ? data.logs[0].logs.filter(
                    (bal) => bal.app_code === appSelected
                  )
                : data.logs[0].logs
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
