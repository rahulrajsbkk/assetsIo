import React, { createContext, useState, useContext, useEffect } from 'react';
import { BankContext } from './Context';
import Axios from 'axios';

export const EarningsContext = createContext();

function EarningsContextProvider({ children }) {
  const { profileId, email } = useContext(BankContext);
  const [coinBalanceList, setCoinBalanceList] = useState([]);
  const [vaultTxns, setVaultTxns] = useState([]);
  const [coinSelected, setCoinSelected] = useState({});
  const [coinAddress, setCoinAddress] = useState({});
  const [loading, setLoading] = useState(true);
  async function updateBalance() {
    setLoading(true);
    const resOne = await Axios.post(
      'https://comms.globalxchange.com/coin/vault/service/coins/get',
      {
        app_code: 'ice',
        profile_id: profileId,
      }
    );
    const dataOne = resOne.data;
    setCoinBalanceList(dataOne.coins_data);
    const btcArray = dataOne.coins_data.filter(
      (coin) => coin.coinSymbol === 'BTC'
    );
    setCoinSelected(btcArray[0]);
    setLoading(true);
    const resTwo = await Axios.post(
      'https://comms.globalxchange.com/coin/vault/service/balances/get',
      {
        app_code: 'ice',
        profile_id: profileId,
      }
    );
    const dataTWO = resTwo.data;
    if (dataTWO.status) {
      setCoinAddress(dataTWO.vault.coinAddress);
    }
    setLoading(true);
    const resThree = await Axios.post(
      'https://comms.globalxchange.com/coin/vault/service/txns/get',
      {
        app_code: 'ice',
        profile_id: profileId,
      }
    );
    const dataThree = resThree.data;
    if (dataThree.status) setVaultTxns(dataThree.txns);
    setLoading(false);
  }

  const [liquidEarningBalances, setLiquidEarningBalances] = useState({});
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/service/user/app/interest/balances/get?app_code=instacrypto&email=${email}`
    )
      .then((res) => {
        const { data } = res;
        if (
          data.status &&
          data.result &&
          data.result[0] &&
          data.result[0].balances &&
          data.result[0].balances[0]
        ) {
          setLiquidEarningBalances(data.result[0].balances[0].liquid_balances);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  const [earnTransactions, setEarnTransactions] = useState([]);
  useEffect(() => {
    if (email && coinSelected && coinSelected.coinSymbol)
      Axios.get(
        `https://comms.globalxchange.com/coin/vault/service/user/app/interest/logs/get?email=${email}&app_code=instacrypto&coin=${coinSelected.coinSymbol}`
      ).then((res) => {
        const { data } = res;
        if (data.status && data.logs && data.logs[0]) {
          setEarnTransactions(data.logs[0].logs);
        }
      });
  }, [email, coinSelected]);

  useEffect(() => {
    if (profileId) {
      updateBalance();
    }
    // eslint-disable-next-line
  }, [profileId]);

  // For Vault Filter Conrolls

  const [menuTwo, setMenuTwo] = useState({
    key: 'all',
    value: 'All Directions',
  });

  const [dateSelected, setDateSelected] = useState(null);

  return (
    <EarningsContext.Provider
      value={{
        coinBalanceList,
        coinSelected,
        setCoinSelected,
        vaultTxns,
        updateBalance,
        coinAddress,
        loading,
        menuTwo,
        setMenuTwo,
        dateSelected,
        setDateSelected,
        liquidEarningBalances,
        earnTransactions,
      }}
    >
      {children}
    </EarningsContext.Provider>
  );
}

export default EarningsContextProvider;
