import React, { createContext, useState } from 'react';

export const VaultContext = createContext();

function VaultContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [coinContract, setCoinContract] = useState('');
  const [daysToHold, setDaysToHold] = useState(0);
  const [dashTab, setDashTab] = useState('Dashboard');

  const calculateRoi = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDashTab('Contracts');
    }, 2000);
  };
  return (
    <VaultContext.Provider
      value={{
        coinContract,
        setCoinContract,
        daysToHold,
        setDaysToHold,
        calculateRoi,
        loading,
        dashTab,
        setDashTab,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export default VaultContextProvider;
