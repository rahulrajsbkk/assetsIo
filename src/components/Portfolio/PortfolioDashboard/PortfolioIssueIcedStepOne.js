import React, { useState, useContext, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import PortfolioIssueIcedChecckoutCoin from './PortfolioIssueIcedChecckoutCoin';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';

function PortfolioIssueIcedStepOne() {
  const { coinContract = 'BTC' } = useContext(PortfolioContext);
  const { conractsObj, coinListObject } = useContext(BankContext);

  const [stepIn, setStepIn] = useState(1);
  const [assetClass, setAssetClass] = useState('crypto');
  const [coinObj, setCoinObj] = useState({});
  const [percent, setPercent] = useState('');
  const [count, setCount] = useState('');
  const [contractRateUsd, setContractRateUsd] = useState(1);
  useEffect(() => {
    setContractRateUsd(
      (conractsObj[coinContract] &&
        conractsObj[coinContract].amount &&
        coinListObject &&
        coinListObject[coinContract] &&
        coinListObject[coinContract].price.USD &&
        coinListObject[coinContract].price.USD *
          conractsObj[coinContract].amount) ||
        1
    );
  }, [conractsObj, coinContract]);

  const onPercentChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value <= 100) {
      setPercent(e.target.value);
      setCount(
        parseFloat(
          (
            ((coinObj && coinObj.coinValueUSD) * (e.target.value / 100)) /
            contractRateUsd
          ).toFixed(2)
        )
      );
    }
  };
  const onCountChange = (e) => {
    if (!isNaN(e.target.value)) {
      setCount(parseInt(e.target.value) || '');
      setPercent(
        parseFloat(
          (
            (e.target.value * contractRateUsd * 100) /
            (coinObj && coinObj.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
  };
  const roundSimulation = (firtTime) => {
    if (!Number.isInteger(count)) {
      setCount(parseInt(count));
      setPercent(
        parseFloat(
          (
            (parseInt(count) * contractRateUsd * 100) /
            (coinObj && coinObj.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
    if (firtTime || percent > 100) {
      const cnt = parseInt((coinObj && coinObj.coinValueUSD) / contractRateUsd);
      setCount(cnt);
      setPercent(
        parseFloat(
          (
            (parseInt(cnt) * contractRateUsd * 100) /
            (coinObj && coinObj.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
  };

  useEffect(() => {
    if (coinObj && coinObj.coinValueUSD && contractRateUsd && coinContract) {
      roundSimulation(true);
    }
  }, [coinObj, contractRateUsd, coinContract]);

  return (
    <div className="issueIcedStepOne">
      <div className={`issueBond step-${stepIn}`}>
        <div className="head">Issue Your Bond</div>
        <p className="desc">
          Now That You Have Established The Parameters For Your Bond, You Are
          Ready To Convert Your Liquid Asset Into Ice. Here Are The Final
          Configuarations Of Your Bond.
        </p>
        <div className="btnLetsDoIt" onClick={() => setStepIn(1)}>
          Lets Do It
        </div>
        <div className="exactAmt">
          <span>Exact Amount</span>
          {percent > 100 || !Number.isInteger(count) ? (
            <span onClick={() => roundSimulation()}>Round Simulation</span>
          ) : (
            ''
          )}
        </div>
        <div
          className={`boxContrtolls ${
            coinObj && coinObj.coinName ? '' : 'dis'
          }`}
        >
          <div className="coin">
            {(coinObj && coinObj.coinName) || assetClass}
          </div>
          <input
            value={percent}
            onChange={onPercentChange}
            type="text"
            placeholder="0.00%"
            readOnly={coinObj && coinObj.coinName ? false : true}
          />
          <input
            value={count}
            onChange={onCountChange}
            type="text"
            placeholder="1 Bond"
            readOnly={coinObj && coinObj.coinName ? false : true}
          />
        </div>
        <Scrollbars
          className="headScroll"
          renderThumbHorizontal={() => <div />}
          renderThumbVertical={() => <div />}
          renderView={(props) => <div {...props} className="scrollList" />}
        >
          <div
            className={`assetClass ${assetClass === 'crypto'}`}
            onClick={() => setAssetClass('crypto')}
          >
            Crypto
          </div>
          <div
            className={`assetClass ${assetClass === 'fiat'}`}
            onClick={() => setAssetClass('fiat')}
          >
            Fiat
          </div>
          <div className="assetClass">Funds</div>
          <div className="assetClass">Loans</div>
          <div className="assetClass">Real Estate</div>
          <div className="assetClass">Private Equity</div>
          <div className="assetClass">Digital Properties</div>
          <div className="assetClass">Influence</div>
        </Scrollbars>
        <PortfolioIssueIcedChecckoutCoin
          coinObj={coinObj}
          setCoinObj={setCoinObj}
          assetClass={assetClass}
        />
      </div>
      <div className="bondOverview"></div>
    </div>
  );
}

export default PortfolioIssueIcedStepOne;
