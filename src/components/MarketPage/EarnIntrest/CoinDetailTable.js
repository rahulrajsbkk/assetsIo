import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';

function CoinDetailTable({ coinToDetail, isAsset, setCoinToDetail }) {
  const [toHide, setToHide] = useState('');
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
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
            $
            <CountUp
              onEnd={() => {
                setTimeout(() => {
                  togleDuration(duration);
                }, 3000);
              }}
              duration={duration}
              end={1.01 || 0}
              decimals={2}
            />
            <small>
              (<CountUp duration={duration} end={1.36 || 0} decimals={2} />
              %)
            </small>
          </h2>
          <div className="label">Last Price</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={316.35 || 0} decimals={2} />B
          </h3>
          <div className="label">Market Cap</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={25.16 || 0} decimals={2} />B
          </h3>
          <div className="label">24 Hr Volume</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={4 || 0} decimals={0} />
            :<CountUp duration={duration} end={1 || 0} decimals={0} />
          </h3>
          <div className="label">Trade/Hold Ratio</div>
        </div>
      </div>

      <div
        className={`lastIntrest ${toHide === 'lastIntrest' ? 'd-none' : ''}`}
        onClick={() => setToHide('lastPrice')}
      >
        <div className="price">
          <h2>
            <CountUp duration={duration} end={1.36 || 0} decimals={2} />%
            <small className="true">
              (<CountUp duration={duration} end={1.36 || 0} decimals={2} />
              %)
            </small>
          </h2>
          <div className="label">Last Interest Rate</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={12.36 || 0} decimals={2} />%
          </h3>
          <div className="label">3 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={12.36 || 0} decimals={2} />%
          </h3>
          <div className="label">6 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp duration={duration} end={1.36 || 0} decimals={2} /> BTC
          </h3>
          <div className="label">Supply</div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetailTable;
