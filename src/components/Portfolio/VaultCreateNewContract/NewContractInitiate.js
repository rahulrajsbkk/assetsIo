import React, { useState, useContext, useEffect } from 'react';

import next from '../../../static/images/next-anim.svg';
import btcWide from '../../../static/images/vault-methods/bitcoin.svg';
import btc from '../../../static/images/coin-small/btc.svg';
import eth from '../../../static/images/coin-small/eth.svg';
import usdt from '../../../static/images/coin-small/usdt.svg';
import searchIcon from '../../../static/images/search.svg';
import animCheverons from '../../../static/images/cheverons-right.svg';
import { BankContext } from '../../../context/Context';
import { PortfolioContext } from '../../../context/PortfolioContext';

const validNumber = new RegExp(/^\d*$/);
function NewContractInitiate() {
  const { coinList, coinListObject } = useContext(BankContext);
  const { initiate, contractPreview } = useContext(PortfolioContext);
  const [coin, setCoin] = useState('Bitcoin');
  const [coinObj, setCoinObj] = useState({});
  const [coinImg, setCoinImg] = useState(btc);
  const [searchEnable, setSearchEnable] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [count, setCount] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    setCoinObj(coinList.filter((coins) => coins.coinName === coin)[0]);
  }, [coinList, coin]);

  useEffect(() => {
    if (!searchStr) {
      setSearchResult([]);
    } else {
      setSearchResult(
        coinList.filter(
          (coin) =>
            coin.coinName.toLowerCase().includes(searchStr.toLowerCase()) ||
            coin.coinSymbol.toLowerCase().includes(searchStr.toLowerCase())
        )
      );
    }
  }, [coinList, searchStr]);

  const formatNum = (num, prec) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: prec,
      minimumFractionDigits: prec,
    }).format(num);
  const getPrec = () => {
    if (
      coinObj &&
      coinObj.coinSymbol &&
      (coinObj.coinSymbol === 'BTC' || coinObj.coinSymbol === 'ETH')
    )
      return 4;
    return 2;
  };

  const [rates, setRates] = useState({ BTC: 0.0001 });
  useEffect(() => {
    let ratesObj = {};
    coinList.forEach((coin) => {
      ratesObj[coin.coinSymbol] = coin.price.USD;
    });
    setRates(ratesObj);
  }, [coinList]);
  return (
    <div className="newContractInitiate">
      <div className="head">
        <div className="vaultUsing">
          Which Vault Are You Using?
          <img src={animCheverons} alt="" />
        </div>
        <div className="coin-select">
          {searchEnable ? (
            ''
          ) : (
            <>
              <div
                className={`coin-wrap ${coin === 'Bitcoin'}`}
                onClick={() => {
                  setCoin('Bitcoin');
                  setCoinImg(btc);
                }}
              >
                <img src={btc} alt="" />
              </div>
              <div
                className={`coin-wrap ${coin === 'Ethereum'}`}
                onClick={() => {
                  setCoin('Ethereum');
                  setCoinImg(eth);
                }}
              >
                <img src={eth} alt="" />
              </div>
              <div
                className={`coin-wrap ${coin === 'Tether'}`}
                onClick={() => {
                  setCoin('Tether');
                  setCoinImg(usdt);
                }}
              >
                <img src={usdt} alt="" />
              </div>
            </>
          )}
          <div className={`search-wrapper  ${searchEnable}`}>
            <div className="serch-n-result">
              {searchEnable ? (
                <>
                  <div className="search">
                    <input
                      type="text"
                      value={searchStr}
                      onChange={(e) => setSearchStr(e.target.value)}
                      placeholder="Search Iced Vaults"
                    />
                    <span
                      className="serch-close"
                      onClick={() => {
                        setSearchEnable(!searchEnable);
                        setSearchStr('');
                      }}
                    >
                      ×
                    </span>
                  </div>
                  {searchResult.map((coin) => (
                    <div
                      className="search-res"
                      key={coin.coinName}
                      onClick={() => {
                        setCoin(coin.coinName);
                        setCoinImg(coin.coinImage);
                        setSearchEnable(!searchEnable);
                        setSearchStr('');
                      }}
                    >
                      <img
                        src={coin.coinImage}
                        alt=""
                        className="search-coin"
                      />
                      <div className="coin">{coin.coinName}</div>
                      <div className="value">
                        ${usdAmountFormatter.format(coin.price.USD)}
                        <small className={`change ${coin._24hrchange < 0}`}>
                          ({usdAmountFormatter.format(coin._24hrchange)}%)
                        </small>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <img
                  className="search-icon"
                  src={searchIcon}
                  alt=""
                  onClick={() => {
                    setSearchEnable(!searchEnable);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="contractContent">
        <div className="costNCount">
          <div className="costOfContract">
            <span>Cost Of </span>
            <input
              type="text"
              value={count}
              onChange={(e) => {
                if (validNumber.test(e.target.value)) setCount(e.target.value);
              }}
            />
            <span>
              {' '}
              {coinListObject[contractPreview.coin].coinName} Contract
            </span>
          </div>
          <div className="coinDetail">
            <img src={coinListObject[contractPreview.coin].coinImage} alt="" />
            <div className="name">
              {coinListObject[contractPreview.coin].coinName}
            </div>
            <div className="value">
              {formatNum(contractPreview.contractCost * count, 4)}
            </div>
          </div>
        </div>
        <div className="toCheckOut">
          <div className="coinDetailWrap">
            <div className="title">Your {coin} Vault WIll Be Debited</div>
            <div className="coinDetail">
              <img src={coinImg} alt="" />
              <div className="name">{coin}</div>
              <div className="value">
                {formatNum(
                  coinObj &&
                    coinObj.coinSymbol &&
                    (contractPreview.contractCost *
                      rates[contractPreview.coin] *
                      count) /
                      rates[coinObj.coinSymbol],
                  getPrec()
                )}
              </div>
            </div>
          </div>
          <div className="btn-initiate" onClick={initiate}>
            <h5>
              Initiate
              <img src={next} alt="" />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewContractInitiate;
