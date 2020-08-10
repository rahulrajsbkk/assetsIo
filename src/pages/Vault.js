import React, { useState, useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';

import { BankContext } from '../context/Context';
import VaultContextProvider from '../context/VaultContext';
import Layout from '../Layout/Index';
import btc from '../static/images/coin-small/btc.svg';
import eth from '../static/images/coin-small/eth.svg';
import usdt from '../static/images/coin-small/usdt.svg';
import searchIcon from '../static/images/search.svg';

function Vault({ match }) {
  const { coinList } = useContext(BankContext);
  const [coin, setCoin] = useState('Bitcoin');
  const [searchEnable, setSearchEnable] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
    <VaultContextProvider>
      <Layout active={`vaults-${match.params.type}`} className="vaults">
        <div className="head">
          <div className="vault-n-balance">
            <div className="vault">{coin} Vault</div>
            <div className="balance">
              0.03211 <small>$23,135.31</small>
            </div>
          </div>
          <div className="coin-select">
            {searchEnable ? (
              ''
            ) : (
              <>
                <div
                  className={`coin-wrap ${coin === 'Bitcoin'}`}
                  onClick={() => setCoin('Bitcoin')}
                >
                  <img src={btc} alt="" />
                </div>
                <div
                  className={`coin-wrap ${coin === 'Ethereum'}`}
                  onClick={() => setCoin('Ethereum')}
                >
                  <img src={eth} alt="" />
                </div>
                <div
                  className={`coin-wrap ${coin === 'Tether'}`}
                  onClick={() => setCoin('Tether')}
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
        <div className="controlls">
          <div className="drop-select mr-3">
            All Types
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="drop-select mr-3">
            All Vaults
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="drop-select mr-3">
            All Time
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="search ml-auto">
            <input type="text" name="serch" placeholder="Search Vaults" />
            <FontAwesomeIcon className="ml-2" icon={faSearch} />
          </div>
        </div>

        <Scrollbars
          autoHide
          className="vaults-list"
          renderView={(props) => <div {...props} className="vaultsView" />}
        >
          <div className="day">Today</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="day">Yesterday</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="day">July 20th 2020</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
        </Scrollbars>
      </Layout>
    </VaultContextProvider>
  );
}

export default Vault;
