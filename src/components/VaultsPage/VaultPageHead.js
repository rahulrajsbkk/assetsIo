import React, { useState, useContext, useEffect } from 'react';
import btc from '../../static/images/coin-small/btc.svg';
import eth from '../../static/images/coin-small/eth.svg';
import usdt from '../../static/images/coin-small/usdt.svg';
import searchIcon from '../../static/images/search.svg';
import { VaultContext } from '../../context/VaultContext';
import { FormatCurrency } from '../../utils/FunctionTools';

function VaultPageHead() {
  const { coinBalanceList, coinSelected, setCoinSelected } = useContext(
    VaultContext
  );
  const [coin, setCoin] = useState('BTC');
  const [searchEnable, setSearchEnable] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (coin) {
      setCoinSelected(
        coinBalanceList.filter((coinOb) => coinOb.coinSymbol === coin)[0]
      );
    }
  }, [coin, setCoinSelected, coinBalanceList]);

  useEffect(() => {
    if (!searchStr) {
      setSearchResult([]);
    } else {
      setSearchResult(
        coinBalanceList.filter(
          (coin) =>
            coin.coinName.toLowerCase().includes(searchStr.toLowerCase()) ||
            coin.coinSymbol.toLowerCase().includes(searchStr.toLowerCase())
        )
      );
    }
  }, [coinBalanceList, searchStr]);
  return (
    <div className="head">
      <div className="vault-n-balance">
        <div className="vault">
          {coinSelected && coinSelected.coinName} Vault
        </div>
        <div className="balance">
          {coinSelected &&
            FormatCurrency(
              coinSelected.coinValue,
              coinSelected.coinSymbol
            )}{' '}
          <small>
            ${coinSelected && FormatCurrency(coinSelected.coinValueUSD)}
          </small>
        </div>
      </div>
      <div className="coin-select">
        {searchEnable ? (
          ''
        ) : (
          <>
            <div
              className={`coin-wrap ${
                coinSelected && coinSelected.coinSymbol === 'BTC'
              }`}
              onClick={() => setCoin('BTC')}
            >
              <img src={btc} alt="" />
            </div>
            <div
              className={`coin-wrap ${
                coinSelected && coinSelected.coinSymbol === 'ETH'
              }`}
              onClick={() => setCoin('ETH')}
            >
              <img src={eth} alt="" />
            </div>
            <div
              className={`coin-wrap ${
                coinSelected && coinSelected.coinSymbol === 'USDT'
              }`}
              onClick={() => setCoin('USDT')}
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
                      setCoinSelected(coin);
                      setCoin('');
                      setSearchEnable(!searchEnable);
                    }}
                  >
                    <img src={coin.coinImage} alt="" className="search-coin" />
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
      </div>
    </div>
  );
}

export default VaultPageHead;
