import React from 'react';

function LoanControlls() {
  return (
    <div className="loans-controlls">
      <div className="type-controll">
        <div className="type active">All</div>
        <div className="type">
          <div
            className="indicator"
            style={{ backgroundColor: 'rgb(67, 145, 236)' }}
          />
          Compound
        </div>
        <div className="type">
          <div
            className="indicator"
            style={{ backgroundColor: 'rgb(178, 208, 204)' }}
          />
          Maker SCD
        </div>
        <div className="type">
          <div
            className="indicator"
            style={{ backgroundColor: 'rgb(123, 209, 245)' }}
          />
          dYdX
        </div>
      </div>
      <div className="time-period-controll">
        <div className="period">24H</div>
        <div className="period">7D</div>
        <div className="period active">1M</div>
        <div className="period">3M</div>
        <div className="period">YTD</div>
        <div className="period">1Y</div>
        <div className="period">MAX</div>
      </div>
    </div>
  );
}

export default LoanControlls;
