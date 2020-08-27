import React from 'react';

function PortfolioDashCardsList({ selectedCard, setSelectedCard }) {
  if (selectedCard)
    return (
      <div className="cardsSection detail">
        <h3>{selectedCard}</h3>
        <h6>{selectedCard}</h6>
      </div>
    );
  return (
    <div className="cardsSection">
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Cryptocurrency')}
      >
        <div className="name">Cryptocurrency</div>
        <div className="value">$125,367.31 USD</div>
      </div>
      <div
        className="indexCard"
        onClick={() => setSelectedCard('Fiat Currency')}
      >
        <div className="name">Fiat Currency</div>
        <div className="value">$125,367.31 USD</div>
      </div>
      <div className="indexCard" onClick={() => setSelectedCard('Indicies')}>
        <div className="name">Indicies</div>
        <div className="value">$125,367.31 USD</div>
      </div>
      <div className="indexCard" onClick={() => setSelectedCard('Indicies')}>
        <div className="name">Indicies</div>
        <div className="value">$125,367.31 USD</div>
      </div>
      <div className="indexCard" onClick={() => setSelectedCard('Indicies')}>
        <div className="name">Indicies</div>
        <div className="value">$125,367.31 USD</div>
      </div>
    </div>
  );
}

export default PortfolioDashCardsList;
