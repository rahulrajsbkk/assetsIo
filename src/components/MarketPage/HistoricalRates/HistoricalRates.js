import React from 'react';
import HistoricalRatesCard from './HistoricalRatesCard';
import HistoryRatesControll from './HistoryRatesControll';

function HistoricalRates({ title }) {
  return (
    <div className="historical-rates">
      <h2 className="card-title">{title}</h2>
      <HistoryRatesControll />
      <HistoricalRatesCard />
      <HistoricalRatesCard />
      <HistoricalRatesCard />
      <HistoricalRatesCard />
    </div>
  );
}

export default HistoricalRates;
