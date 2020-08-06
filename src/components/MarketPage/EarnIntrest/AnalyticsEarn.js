import React, { useState } from 'react';

function AnalyticsEarn() {
  const [selected, setSelected] = useState('Drawdown');
  return (
    <div className="analyticsEarn">
      <div className="menu">
        <div
          className={`menu-itm ${selected === 'Drawdown'}`}
          onClick={() => setSelected('Drawdown')}
        >
          Drawdown
        </div>
        <div
          className={`menu-itm ${selected === 'Bond Risk'}`}
          onClick={() => setSelected('Bond Risk')}
        >
          Bond Risk
        </div>
        <div
          className={`menu-itm ${selected === 'Alpha Analysis'}`}
          onClick={() => setSelected('Alpha Analysis')}
        >
          Alpha Analysis
        </div>
        <div
          className={`menu-itm ${selected === 'News'}`}
          onClick={() => setSelected('News')}
        >
          News
        </div>
        <div
          className={`menu-itm ${selected === 'Supply/Demman'}`}
          onClick={() => setSelected('Supply/Demman')}
        >
          Supply/Demman
        </div>
      </div>
      <div className="content"></div>
    </div>
  );
}

export default AnalyticsEarn;
