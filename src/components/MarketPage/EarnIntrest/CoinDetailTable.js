import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import { BankContext } from '../../../context/Context';
import FundVault from '../../VaultsPage/VaultFundWithdraw/FundVault';
import { VaultContext } from '../../../context/VaultContext';

function CoinDetailTable({ coinToDetail, isAsset, setCoinToDetail }) {
  const { email, updateInterval, coinData } = useContext(BankContext);
  const { setCoinSelected } = useContext(VaultContext);
  const [toHide, setToHide] = useState('');
  const [duration, setDuration] = useState(3);
  const [depositModal, setDepositModal] = useState(false);
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
        <div
          className="btnDeposit"
          onClick={() => {
            if (email) {
              setCoinSelected(coinToDetail);
              setDepositModal(true);
            }
          }}
        >
          Deposit {coinToDetail.coinSymbol}
        </div>
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
                if (updateInterval)
                  setTimeout(() => {
                    togleDuration(duration);
                  }, updateInterval * 1000);
              }}
              duration={duration}
              start={0}
              end={coinData[coinToDetail.coinSymbol].usd_price || 0}
              decimals={2}
            />
            <small>
              (
              <CountUp
                start={0}
                duration={duration}
                end={coinData[coinToDetail.coinSymbol]._24hrchange || 0}
                decimals={2}
              />
              %)
            </small>
          </h2>
          <div className="label">Last Price</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              start={314.35}
              duration={duration}
              end={
                coinData[coinToDetail.coinSymbol].market_cap / 1000000000 || 0
              }
              decimals={2}
            />
            B
          </h3>
          <div className="label">Market Cap</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={23.16}
              end={
                coinData[coinToDetail.coinSymbol].volume_24hr / 1000000000 || 0
              }
              decimals={2}
            />
            B
          </h3>
          <div className="label">24 Hr Volume</div>
        </div>
        <div className="subSec" style={{ opacity: 0.3 }}>
          <h3>
            <CountUp duration={duration} end={0} decimals={0} />
            :<CountUp duration={duration} end={0} decimals={1} />
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
            <CountUp
              duration={duration}
              start={0}
              end={1.36 || 0}
              decimals={2}
            />
            %
            <small className="true">
              (
              <CountUp
                start={0}
                duration={duration}
                end={1.36 || 0}
                decimals={2}
              />
              %)
            </small>
          </h2>
          <div className="label">Last Interest Rate</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={10.36}
              end={12.36 || 0}
              decimals={2}
            />
            %
          </h3>
          <div className="label">3 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={10.36}
              end={12.36 || 0}
              decimals={2}
            />
            %
          </h3>
          <div className="label">6 Month Bond</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={0}
              end={1.36 || 0}
              decimals={2}
            />{' '}
            BTC
          </h3>
          <div className="label">Supply</div>
        </div>
      </div>
      <FundVault
        key={`${depositModal}`}
        fundOrWithdraw={'Deposit'}
        isDeposit={true}
        openModal={depositModal}
        setOpenModal={setDepositModal}
      />
    </div>
  );
}

export default CoinDetailTable;
