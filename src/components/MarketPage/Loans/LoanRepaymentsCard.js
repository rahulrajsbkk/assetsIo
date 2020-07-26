import React, { useState } from 'react';
import LoanChartBar from '../EarnIntrest/LoansCard/LoanChartBar';

function LoanRepaymentsCard() {
  const [sortBy, setSortBy] = useState('BY ASSETS');
  return (
    <div id="loan-repay" className="loans-originated-card">
      <div className="loans-originated-head">
        Repayments
        <div className="switch">
          <div
            className={`option ${sortBy === 'BY ASSETS'}`}
            onClick={() => setSortBy('BY ASSETS')}
          >
            BY ASSETS
          </div>
          <div
            className={`option ${sortBy === 'BY PROTOCOLS'}`}
            onClick={() => setSortBy('BY PROTOCOLS')}
          >
            BY PROTOCOLS
          </div>
        </div>
      </div>
      <div className="chart-n-table">
        <div className="chart-detail">
          <div className="volume-n-transaction">
            <div className="">
              <div className="one-month">1 MONTH VOLUME</div>
              <div className="volume">$5,138,134,449</div>
            </div>
            <div className="">
              <div className="one-month">1 MONTH TRANSACTIONS COUNT</div>
              <div className="volume">41,937</div>
            </div>
          </div>
          <div className="chart">
            <LoanChartBar />
          </div>
        </div>
        <div className="table-chart">
          <div className="head">
            <div className="amount">AMOUNT</div>
            <div className="asset">ASSET</div>
            <div className="share">SHARE</div>
          </div>
          <div className="list-itm">
            <div className="amount">
              <div className="amt">2,484,651,509</div>
              <div className="usd">$2,520,934,276</div>
            </div>
            <div className="asset">
              <img
                className="coin-img"
                src="https://loanscan.io/static/media/usdc-icon.8287751b.svg"
                alt=""
              />
              USDC
            </div>
            <div className="share">13%</div>
          </div>
          <div className="list-itm">
            <div className="amount">
              <div className="amt">2,484,651,509</div>
              <div className="usd">$2,520,934,276</div>
            </div>
            <div className="asset">
              <img
                className="coin-img"
                src="https://loanscan.io/static/media/usdc-icon.8287751b.svg"
                alt=""
              />
              USDC
            </div>
            <div className="share">13%</div>
          </div>
          <div className="list-itm">
            <div className="amount">
              <div className="amt">2,484,651,509</div>
              <div className="usd">$2,520,934,276</div>
            </div>
            <div className="asset">
              <img
                className="coin-img"
                src="https://loanscan.io/static/media/usdc-icon.8287751b.svg"
                alt=""
              />
              USDC
            </div>
            <div className="share">13%</div>
          </div>
          <div className="list-itm">
            <div className="amount">
              <div className="amt">2,484,651,509</div>
              <div className="usd">$2,520,934,276</div>
            </div>
            <div className="asset">
              <img
                className="coin-img"
                src="https://loanscan.io/static/media/usdc-icon.8287751b.svg"
                alt=""
              />
              USDC
            </div>
            <div className="share">13%</div>
          </div>
          <div className="list-itm">
            <div className="amount">
              <div className="amt">2,484,651,509</div>
              <div className="usd">$2,520,934,276</div>
            </div>
            <div className="asset">
              <div className="coin-img" />
              Other
            </div>
            <div className="share">13%</div>
          </div>
        </div>
      </div>
      <div className="type-controll">
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
    </div>
  );
}

export default LoanRepaymentsCard;
