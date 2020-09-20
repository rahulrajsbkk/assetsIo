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

  const [showNativeValue, setShowNativeValue] = useState(true);

  return (
    <VaultContext.Provider
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
        showNativeValue,
        setShowNativeValue,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export default VaultContextProvider;
