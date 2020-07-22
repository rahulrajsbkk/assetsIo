import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import btc from '../../static/images/vault-methods/bitcoin.svg';
import eth from '../../static/images/vault-methods/ethereum.svg';
import xrp from '../../static/images/vault-methods/ripple.svg';
import usdt from '../../static/images/vault-methods/tether.svg';
import next from '../../static/images/next.svg';
import prev from '../../static/images/prev.svg';

const coins = [{ img: btc }, { img: eth }, { img: usdt }, { img: xrp }];
function FooterRates() {
  const [index, setIndex] = useState(0);

  const isPrev = (i) => {
    if (index === 0) {
      if (i === coins.length - 1) return true;
    } else {
      if (i === index - 1) return true;
    }
    return false;
  };
  const isNext = (i) => {
    if (index === coins.length - 1) {
      if (i === 0) return true;
    } else {
      if (i === index + 1) return true;
    }
    return false;
  };
  const [ratesRes, setRatesRes] = useState([]);
  useEffect(() => {
    Axios.get(
      'https://comms.globalxchange.com/coin/vault/earnings/getinterestrates'
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setRatesRes(data.rates);
      }
    });
  }, []);

  const formatPercent = (num) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }).format(num);

  const arrow = (
    <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
        fill="#3EA154"
      />
    </svg>
  );
  return (
    <div className="footer-rates">
      <div className="current-rates">
        <img
          src={prev}
          alt=""
          onClick={() => setIndex(index === 0 ? coins.length - 1 : index - 1)}
        />
        <h5>Current Interest Rates</h5>
        <img
          src={next}
          alt=""
          onClick={() => setIndex(index === coins.length - 1 ? 0 : index + 1)}
        />
      </div>
      <div className="rates-list">
        <div className="coin">
          <div className="col-6 coin-logo">
            <img src={btc} alt="" />
          </div>
          <div className="col-6 rate-text">
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
        </div>
        <div className="coin">
          <div className="col-6 coin-logo">
            <img src={eth} alt="" />
          </div>
          <div className="col-6 rate-text">
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
        </div>
        <div className="coin">
          <div className="col-6 coin-logo">
            <img src={usdt} alt="" />
          </div>
          <div className="col-6 rate-text">
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
        </div>
        <div className="coin">
          <div className="col-6 coin-logo">
            <img src={xrp} alt="" />
          </div>
          <div className="col-6 rate-text">
            <div className="rate">
              {ratesRes[3] && ratesRes[3].tier1.rate
                ? formatPercent(ratesRes[3].tier1.rate)
                : '0.0'}
              %
              <small>
                (1.2%)
                {arrow}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-rates">
          {coins.map((coin, i) => (
            <div
              key={coin.img}
              className={`coin  ${
                index === i
                  ? 'active'
                  : isPrev(i)
                  ? 'prev'
                  : isNext(i)
                  ? 'next'
                  : 'inactive'
              }`}
            >
              <div className="col-6 coin-logo">
                <img src={coin.img} alt="" />
              </div>
              <div className="col-6 rate-text">
                <div className="rate">
                  {ratesRes[i] && ratesRes[i].tier1.rate
                    ? formatPercent(ratesRes[i].tier1.rate)
                    : '0.0'}
                  %
                  <small>
                    (1.2%)
                    {arrow}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterRates;
