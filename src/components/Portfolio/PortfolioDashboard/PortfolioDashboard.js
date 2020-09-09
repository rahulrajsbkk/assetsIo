import React, { useContext } from 'react';

import { PortfolioContext } from '../../../context/PortfolioContext';
import PortfolioGrowAssets from './PortfolioGrowAssets';
import PortfolioAssets from './PortfolioAssets';
import PortfolioSetDays from './PortfolioSetDays';
import PortfolioIssueIcedAsset from './PortfolioIssueIcedAsset';

function PortfolioDashboard() {
  const { icingStep } = useContext(PortfolioContext);

  const icingAssetSteps = [
    <PortfolioAssets />,
    <PortfolioSetDays />,
    <PortfolioIssueIcedAsset />,
  ];

  const getDashContent = () => {
    return icingAssetSteps[icingStep];
  };
  return (
    <div className="portfolioDashboard">
      {getDashContent()}
      <PortfolioGrowAssets />
    </div>
  );
}

export default PortfolioDashboard;
