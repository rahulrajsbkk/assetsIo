import React, { createContext, useState, useContext, useEffect } from 'react';
import { BankContext } from './Context';
import Axios from 'axios';

export const VaultContext = createContext();

function VaultContextProvider({ children }) {
  const { profileId } = useContext(BankContext);
  const [coinBalanceList, setCoinBalanceList] = useState([]);
  const [coinSelected, setCoinSelected] = useState({});
  useEffect(() => {
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
  }, [profileId]);
  return (
    <VaultContext.Provider
      value={{ coinBalanceList, coinSelected, setCoinSelected }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export default VaultContextProvider;
