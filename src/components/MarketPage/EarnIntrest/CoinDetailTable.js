import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import { BankContext } from '../../../context/Context';
import FundVault from '../../VaultsPage/VaultFundWithdraw/FundVault';
import { VaultContext } from '../../../context/VaultContext';
import { IndexContext } from '../../../context/IndexContext';
import LoginWrapper from '../../LoginModal/LoginWrapper';

function CoinDetailTable({
  coinToDetail,
  isAsset,
  setCoinToDetail,
  stepOne,
  root,
}) {
  const { email, updateInterval, coinData } = useContext(BankContext);
  const { setCoinSelected } = useContext(VaultContext);
  const { conractsObj } = useContext(IndexContext);
  const [toHide, setToHide] = useState('');
  const [duration, setDuration] = useState(3);
  const [depositModal, setDepositModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };

  return (
    <div className="tableCoinDetail">
      <div className="breadCrumbs">
        <div className="bread" onClick={() => setCoinToDetail(null)}>
          {root}
        </div>
        <div className="div">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="bread" onClick={() => setCoinToDetail(null)}>
          {stepOne}
        </div>
        <div className="div">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
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
            setCoinSelected(coinToDetail);
            if (email) {
              setDepositModal(true);
            } else {
              setLoginModal(true);
            }
          }}
        >
          Earn {coinToDetail.coinSymbol}
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
              start={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  conractsObj[coinToDetail.coinSymbol].base_compression_rate -
                    2) ||
                0
              }
              end={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  conractsObj[coinToDetail.coinSymbol].base_compression_rate) ||
                0
              }
              decimals={2}
            />
            %
          </h3>
          <div className="label">Base Rate</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  conractsObj[coinToDetail.coinSymbol].base_velocity - 2) ||
                0
              }
              end={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  conractsObj[coinToDetail.coinSymbol].base_velocity) ||
                0
              }
              decimals={2}
            />
            %
          </h3>
          <div className="label">Velocity</div>
        </div>
        <div className="subSec">
          <h3>
            <CountUp
              duration={duration}
              start={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  conractsObj[coinToDetail.coinSymbol].acceleration - 2) ||
                0
              }
              end={
                (conractsObj &&
                  conractsObj[coinToDetail.coinSymbol] &&
                  -conractsObj[coinToDetail.coinSymbol].acceleration) ||
                0
              }
              decimals={2}
            />{' '}
          </h3>
          <div className="label">Acceleration</div>
        </div>
      </div>
      <FundVault
        key={`${depositModal}`}
        fundOrWithdraw={'Deposit'}
        isDeposit={true}
        openModal={depositModal}
        setOpenModal={setDepositModal}
      />
      {loginModal ? (
        <LoginWrapper
          onClose={() => {
            setLoginModal(false);
          }}
          onLogin={() => {
            setDepositModal(true);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default CoinDetailTable;
