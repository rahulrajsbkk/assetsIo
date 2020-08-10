import React, { createContext, useState } from 'react';

export const PortfolioContext = createContext();

function PortfolioContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loadingCnfrm, setLoadingCnfrm] = useState(false);
  const [coinContract, setCoinContract] = useState('');
  const [daysToHold, setDaysToHold] = useState(0);
  const [roiStep, setRoiStep] = useState(0);
  const [dashTab, setDashTab] = useState('Dashboard');

  const calculateRoi = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDashTab('Contracts');
    }, 2000);
  };
  const initiate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDashTab('Dashboard');
      setRoiStep(0);
    }, 2000);
  };
  const confirmContract = () => {
    setLoadingCnfrm(true);
    setTimeout(() => {
      setLoadingCnfrm(false);
      setRoiStep(1);
    }, 2000);
  };
  return (
    <PortfolioContext.Provider
      value={{
        coinContract,
        setCoinContract,
        daysToHold,
        setDaysToHold,
        calculateRoi,
        loading,
        dashTab,
        setDashTab,
        confirmContract,
        loadingCnfrm,
        roiStep,
        initiate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioContextProvider;
