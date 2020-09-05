import React, { useState } from 'react';
import PortfolioDashCardsList from './PortfolioDashCardsList';
import PortfolioDashChartMain from './PortfolioDashChartMain';

function ChartNCards() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className="chartNCards">
      <PortfolioDashChartMain
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        selectedApp={selectedApp}
        setSelectedApp={setSelectedApp}
      />
      <PortfolioDashCardsList
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        selectedApp={selectedApp}
        setSelectedApp={setSelectedApp}
      />
    </div>
  );
}

export default ChartNCards;
