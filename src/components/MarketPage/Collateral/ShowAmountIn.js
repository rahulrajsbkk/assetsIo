import React, { useState } from 'react';

function ShowAmountIn() {
  const [coin, setCoin] = useState('USD');
  return (
    <div className="show-amount-in">
      Show amount in&nbsp;
      <div className="switch">
        <div
          className={`option ${coin === 'ETH'}`}
          onClick={() => setCoin('ETH')}
        >
          ETH
        </div>
        <div
          className={`option ${coin === 'USD'}`}
          onClick={() => setCoin('USD')}
        >
          USD
        </div>
      </div>
    </div>
  );
}

export default ShowAmountIn;
