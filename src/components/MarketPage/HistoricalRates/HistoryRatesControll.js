import React from 'react';

function HistoryRatesControll() {
  return (
    <div className="historical-rate-controll">
      <div className="period">24H</div>
      <div className="period">7D</div>
      <div className="period active">1M</div>
      <div className="period">3M</div>
      <div className="period">YTD</div>
      <div className="period">1Y</div>
      <div className="period">MAX</div>
    </div>
  );
}

export default HistoryRatesControll;
