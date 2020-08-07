import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function CoinDetailTable({ coinToDetail, isAsset, setCoinToDetail }) {
  const [toHide, setToHide] = useState('');
  return (
    <div className="tableCoinDetail">
      <div className="breadCrumbs">
        <div className="bread" onClick={() => setCoinToDetail(null)}>
          By {isAsset ? 'Asset' : 'Platform'}
        </div>
        <div className="div">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="bread">{coinToDetail.coinName}</div>
      </div>
      <div className="coinDetail">
        <img src={coinToDetail.coinImage} alt="" />
        <div className="coinName">{coinToDetail.coinName}</div>
        <div className="btnDeposit">Deposit {coinToDetail.coinSymbol}</div>
        <div className="btnBuy">Buy {coinToDetail.coinSymbol}</div>
      </div>
      <div
        className={`lastPrice ${toHide === 'lastPrice' ? 'd-none' : ''}`}
        onClick={() => setToHide('lastIntrest')}
      >
        <div className="price">
          <h2>
            $1.01
            <small>(1.36%)</small>
          </h2>
          <div className="label">Last Price</div>
        </div>
        <div className="subSec">
          <h3>316.35B</h3>
          <div className="label">Market Cap</div>
        </div>
        <div className="subSec">
          <h3>25.16B</h3>
          <div className="label">24 Hr Volume</div>
        </div>
        <div className="subSec">
          <h3>4:1</h3>
          <div className="label">Trade/Hold Ratio</div>
        </div>
      </div>

      <div
        className={`lastIntrest ${toHide === 'lastIntrest' ? 'd-none' : ''}`}
        onClick={() => setToHide('lastPrice')}
      >
        <div className="price">
          <h2>
            1.36%
            <small className="true">(1.36%)</small>
          </h2>
          <div className="label">Last Interest Rate</div>
        </div>
        <div className="subSec">
          <h3>12.36%</h3>
          <div className="label">3 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>12.36%</h3>
          <div className="label">6 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>1.36 BTC</h3>
          <div className="label">Supply</div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetailTable;
