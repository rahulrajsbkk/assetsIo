import React, { useContext, useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { BankContext } from '../context/Context';

import btc from '../static/images/vault-methods/bitcoin.svg';
import eth from '../static/images/vault-methods/ethereum.svg';
import xrp from '../static/images/vault-methods/ripple.svg';
import usdt from '../static/images/vault-methods/tether.svg';

function AssetPriceOrRates({ isIndex }) {
  const { ratesRes, coinList } = useContext(BankContext);

  const arrow = (
    <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
        fill="#3EA154"
      />
    </svg>
  );

  const formatPercent = (num) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }).format(num);
  const formatNum = (num, prec) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: prec,
      minimumFractionDigits: prec,
    }).format(num);

  const [tabItem, setTabItem] = useState('Interest Rates');
  useEffect(() => {
    if (isIndex) {
      setTabItem('Asset Prices');
    } else {
      setTabItem('Interest Rates');
    }
  }, [isIndex]);

  return (
    <>
      <div className="tab-inrest-asset">
        <div
          className={`tab-itm ${tabItem === 'Interest Rates'}`}
          onClick={() => setTabItem('Interest Rates')}
        >
          Interest Rates
        </div>
        <div
          className={`tab-itm ${tabItem === 'Asset Prices'}`}
          onClick={() => setTabItem('Asset Prices')}
        >
          Asset Prices
        </div>
      </div>
      <Scrollbars
        className="rate-list-wrapper"
        autoHide
        renderTrackHorizontal={() => <div />}
        renderThumbHorizontal={() => <div />}
        renderView={(props) => <div {...props} className="rates-list" />}
      >
        {tabItem === 'Interest Rates' ? (
          <>
            <div className="coin">
              <img className="coin-logo" src={btc} alt="" />
              <div className="rate">
                {ratesRes[0] && ratesRes[0].tier1.rate
                  ? formatPercent(ratesRes[0].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={eth} alt="" />
              <div className="rate">
                {ratesRes[1] && ratesRes[1].tier1.rate
                  ? formatPercent(ratesRes[1].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={usdt} alt="" />
              <div className="rate">
                {ratesRes[2] && ratesRes[2].tier1.rate
                  ? formatPercent(ratesRes[2].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={xrp} alt="" />
              <div className="rate">
                {ratesRes[3] && ratesRes[3].tier1.rate
                  ? formatPercent(ratesRes[3].tier1.rate)
                  : '0.0'}
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={btc} alt="" />
              <div className="rate">
                {ratesRes[0] && ratesRes[0].tier1.rate
                  ? formatPercent(ratesRes[0].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={eth} alt="" />
              <div className="rate">
                {ratesRes[1] && ratesRes[1].tier1.rate
                  ? formatPercent(ratesRes[1].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={usdt} alt="" />
              <div className="rate">
                {ratesRes[2] && ratesRes[2].tier1.rate
                  ? formatPercent(ratesRes[2].tier1.rate)
                  : '0.0'}
                %
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
            <div className="coin">
              <img className="coin-logo" src={xrp} alt="" />
              <div className="rate">
                {ratesRes[3] && ratesRes[3].tier1.rate
                  ? formatPercent(ratesRes[3].tier1.rate)
                  : '0.0'}
                <small>
                  (1.2%)
                  {arrow}
                </small>
              </div>
            </div>
          </>
        ) : (
          <>
            {coinList.map((coin) => (
              <div className="coin" key={coin.coinName}>
                <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
                <div className="coin-name">{coin.coinName}</div>
                <div className="rate">
                  {formatNum(coin.price.USD, 2)}
                  <small className={`${coin._24hrchange < 0}`}>
                    ({formatPercent(coin._24hrchange)}){arrow}
                  </small>
                </div>
              </div>
            ))}
          </>
        )}
      </Scrollbars>
    </>
  );
}

export default AssetPriceOrRates;
