import React, { createContext, useState, useContext, useEffect } from 'react';
import { BankContext } from './Context';
import Axios from 'axios';

export const VaultContext = createContext();

function VaultContextProvider({ children }) {
  const { profileId } = useContext(BankContext);
  const [coinBalanceList, setCoinBalanceList] = useState([]);
  const [vaultTxns, setVaultTxns] = useState([]);
  const [coinSelected, setCoinSelected] = useState({});
  const [coinAddress, setCoinAddress] = useState({});
  function updateBalance() {
    Axios.post('https://comms.globalxchange.com/coin/vault/service/coins/get', {
      app_code: 'ice',
      profile_id: profileId,
    }).then((res) => {
      const { data } = res;
      setCoinBalanceList(data.coins_data);
      const btcArray = data.coins_data.filter(
        (coin) => coin.coinSymbol === 'BTC'
      );
      setCoinSelected(btcArray[0]);
    });
    Axios.post(
      'https://comms.globalxchange.com/coin/vault/service/balances/get',
      {
        app_code: 'ice',
        profile_id: profileId,
      }
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setCoinAddress(data.vault.coinAddress);
      }
    });
    Axios.post('https://comms.globalxchange.com/coin/vault/service/txns/get', {
      app_code: 'ice',
      profile_id: profileId,
    }).then((res) => {
      const { data } = res;
      if (data.status) setVaultTxns(data.txns);
    });
  }
  useEffect(() => {
    if (profileId) {
      updateBalance();
    }
    // eslint-disable-next-line
  }, [profileId]);
  return (
    <VaultContext.Provider
      value={{
        coinBalanceList,
        coinSelected,
        setCoinSelected,
        vaultTxns,
        updateBalance,
        coinAddress,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export default VaultContextProvider;
