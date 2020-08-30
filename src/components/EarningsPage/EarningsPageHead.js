import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import btc from '../../static/images/coin-small/btc.svg';
import eth from '../../static/images/coin-small/eth.svg';
import usdt from '../../static/images/coin-small/usdt.svg';
import searchIcon from '../../static/images/search.svg';
import { FormatCurrency } from '../../utils/FunctionTools';
import { EarningsContext } from '../../context/EarningsContext';
import { BankContext } from '../../context/Context';

function EarningsPageHead() {
  const {
    coinSelected,
    setCoinSelected,
    loading,
    liquidEarningBalances,
    liquidOrBond,
    contractEarnings,
  } = useContext(EarningsContext);
  const { coinList } = useContext(BankContext);
  const [coin, setCoin] = useState('BTC');
  const [searchEnable, setSearchEnable] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (coin) {
      setCoinSelected(
        coinList.filter((coinOb) => coinOb.coinSymbol === coin)[0]
      );
    }
  }, [coin, setCoinSelected, coinList]);

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
  return (
    <div className="head">
      <div className="vault-n-balance">
        <div className="vault">
          {loading ? (
            <Skeleton width={150} />
          ) : (
            <>{coinSelected && coinSelected.coinName} Earnings</>
          )}
        </div>
        {liquidOrBond === 'Liquid' ? (
          <div className="balance">
            {loading ? (
              <Skeleton width={250} />
            ) : (
              coinSelected &&
              FormatCurrency(
                liquidEarningBalances[coinSelected.coinSymbol],
                coinSelected.coinSymbol
              )
            )}{' '}
            <small>
              {loading ? (
                ''
              ) : (
                <>
                  $
                  {coinSelected &&
                    FormatCurrency(
                      liquidEarningBalances[coinSelected.coinSymbol] *
                        coinSelected.price.USD
                    )}
                </>
              )}
            </small>
          </div>
        ) : (
          <div className="balance">
            {loading ? (
              <Skeleton width={250} />
            ) : (
              coinSelected &&
              FormatCurrency(
                contractEarnings[coinSelected.coinSymbol],
                coinSelected.coinSymbol
              )
            )}{' '}
            <small>
              {loading ? (
                ''
              ) : (
                <>
                  $
                  {coinSelected &&
                    FormatCurrency(
                      contractEarnings[coinSelected.coinSymbol] *
                        coinSelected.price.USD
                    )}
                </>
              )}
            </small>
          </div>
        )}
      </div>
      <div className="coin-select">
        {loading ? (
          <Skeleton width={250} height={60} />
        ) : searchEnable ? (
          ''
        ) : (
          <>
            <div
              className={`coin-wrap order-2 ${
                coinSelected && coinSelected.coinSymbol === 'BTC'
              }`}
              onClick={() => setCoin('BTC')}
            >
              <img src={btc} alt="" />
            </div>
            <div
              className={`coin-wrap order-3 ${
                coinSelected && coinSelected.coinSymbol === 'ETH'
              }`}
              onClick={() => setCoin('ETH')}
            >
              <img src={eth} alt="" />
            </div>
            {coinSelected &&
            (coinSelected.coinSymbol === 'BTC' ||
              coinSelected.coinSymbol === 'ETH' ||
              coinSelected.coinSymbol === 'USDT') ? (
              <div
                className={`coin-wrap order-4 ${
                  coinSelected && coinSelected.coinSymbol === 'USDT'
                }`}
                onClick={() => setCoin('USDT')}
              >
                <img src={usdt} alt="" />
              </div>
            ) : (
              <div className={`coin-wrap order-1 true`}>
                <img
                  style={{ filter: 'none' }}
                  src={coinSelected && coinSelected.coinImage}
                  alt=""
                />
              </div>
            )}
          </>
        )}
        {loading ? (
          <div className="ml-2">
            <Skeleton width={60} height={60} />
          </div>
        ) : (
          <div className={`search-wrapper order-0  ${searchEnable}`}>
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
                        setCoin(coin.coinSymbol);
                        setSearchEnable(!searchEnable);
                      }}
                    >
                      <img
                        src={coin.coinImage}
                        alt=""
                        className="search-coin"
                      />
                      <div className="coin">{coin.coinName}</div>
                      <div className="value">
                        ${FormatCurrency(coin.price.USD)}
                        <small className={`change ${coin._24hrchange < 0}`}>
                          ({FormatCurrency(coin._24hrchange)}%)
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
        )}
      </div>
    </div>
  );
}

export default EarningsPageHead;
