import React from 'react';
import HistoricalRatesChartLines from './HistoricalRatesChartLines';

function HistoricalRatesCard() {
  return (
    <div className="historical-rate-card">
      <div className="coin-head">
        <img
          src="https://loanscan.io/static/media/bat-icon.985571e7.svg"
          alt=""
        />
        <div className="coin-name">BAT</div>
      </div>
      <div className="chart-n-indicator">
        <div className="chart-wrapper">
          <HistoricalRatesChartLines />
        </div>
        <div className="chart-indicators">
          <div className="platforms">PLATFORMS</div>
          <div className="platform-itm">
            <div
              className="indicator"
              style={{ backgroundColor: 'rgb(67, 145, 236)' }}
            />
            <div className="platform-name">Compound</div>
            <div className="apy">0.02% APY</div>
          </div>
          <div className="platform-itm">
            <div
              className="indicator"
              style={{ backgroundColor: 'rgb(178, 208, 204)' }}
            />
            <div className="platform-name">Nuo</div>
            <div className="apy">0.02% APY</div>
          </div>
          <div className="platform-itm">
            <div
              className="indicator"
              style={{ backgroundColor: 'rgb(123, 209, 245)' }}
            />
            <div className="platform-name">Aave</div>
            <div className="apy">0.02% APY</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricalRatesCard;
