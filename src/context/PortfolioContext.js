import React, { createContext, useContext, useState } from 'react';
import { BankContext } from './Context';

export const PortfolioContext = createContext();
function PortfolioContextProvider({ children }) {
  const { icedContracts } = useContext(BankContext);
  const [coinContract, setCoinContract] = useState('');
  const [filterCurrency, setFilterCurrency] = useState('Cryptocurrency');
  const [icingStep, setIcingStep] = useState(0);
  const [icingDays, setIcingDays] = useState(0);
  const [contractCount, setContractCount] = useState(1);
  const [createContractLoading, setCreateContractLoading] = useState(false);
  const [showGrowAssets, setShowGrowAssets] = useState(true);
  const [iceGrowTitle, setIceGrowTitle] = useState('');
  const [pageOnClose, setPageOnClose] = useState('/');
  const [coinCheckOut, setCoinCheckOut] = useState({});

  return (
    <PortfolioContext.Provider
      value={{
        coinContract,
        setCoinContract,
        icedContracts,
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
        pageOnClose,
        setPageOnClose,
        coinCheckOut,
        setCoinCheckOut,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioContextProvider;
