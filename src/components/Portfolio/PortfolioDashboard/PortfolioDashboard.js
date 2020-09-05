import React, { useContext } from 'react';

import { PortfolioContext } from '../../../context/PortfolioContext';
import PortfolioGrowAssets from './PortfolioGrowAssets';
import PortfolioAssets from './PortfolioAssets';
import PortfolioSetDays from './PortfolioSetDays';
import PortfolioIssueIcedAsset from './PortfolioIssueIcedAsset';
import ChartNCards from './ChartNCards';

function PortfolioDashboard() {
  const { dashTab, setDashTab, icingStep } = useContext(PortfolioContext);

  const icingAssetSteps = [
    <PortfolioAssets />,
    <PortfolioSetDays />,
    <PortfolioIssueIcedAsset />,
  ];

  const getDashContent = () => {
    switch (dashTab) {
      case 'Assets':
        return icingAssetSteps[icingStep];
      default:
        return <ChartNCards />;
    }
  };
  return (
    <div className="portfolioDashboard">
      <div className="tab">
        <div
          className={`tab-itm ${dashTab === 'Net-Worth' ? 'active' : ''}`}
          onClick={() => setDashTab('Net-Worth')}
        >
          <h5>Net-Worth</h5>
        </div>
        <div
          className={`tab-itm ${dashTab === 'Assets' ? 'active' : ''}`}
          onClick={() => {}}
        >
          <h5>Assets</h5>
        </div>
        <div className={`tab-itm ${dashTab === 'Mortgages' ? 'active' : ''}`}>
          <h5>Mortgages</h5>
        </div>
        <div
          className={`tab-itm ${dashTab === 'Co-Investing' ? 'active' : ''}`}
        >
          <h5>Co-Investing</h5>
        </div>
        <div className={`tab-itm ${dashTab === 'Funds' ? 'active' : ''}`}>
          <h5>Funds</h5>
        </div>
      </div>
      {getDashContent()}
      <PortfolioGrowAssets />
    </div>
  );
}

export default PortfolioDashboard;
