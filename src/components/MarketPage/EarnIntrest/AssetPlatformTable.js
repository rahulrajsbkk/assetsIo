import React, { useState, useEffect, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import AssetTable from './AssetTable';
import PlatformTable from './PlatformTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import all from '../../../static/images/allPlatforms.svg';
import eth from '../../../static/images/coin-small/eth.svg';
import usdt from '../../../static/images/coin-small/usdt.svg';
import CoinDetailTable from './CoinDetailTable';
import VaultContextProvider from '../../../context/VaultContext';
import { BankContext } from '../../../context/Context';
import { IndexContext } from '../../../context/IndexContext';

function AssetPlatformTable({
  coinList,
  searchTitle,
  coinToDetail,
  setCoinToDetail,
}) {
  const { setContentSideBar, coinListObject } = useContext(BankContext);
  const { tokenList, coinSelect, setCoinSelect } = useContext(IndexContext);
  const [isAsset, setIsAsset] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    setCoinToDetail(null);
  }, [coinSelect, isAsset, setCoinToDetail]);
  useEffect(() => {
    return () => {
      setContentSideBar({});
    };
  }, [setContentSideBar]);

  const platformList = (
    <>
      {tokenList.map((coin) => (
        <div
          className="coin"
          key={coin}
          onClick={() => {
            setCoinSelect(coin);
            setContentSideBar({});
          }}
        >
          <img
            className="coin-logo mr-2"
            src={
              (coinListObject &&
                coinListObject[coin] &&
                coinListObject[coin].coinImage) ||
              all
            }
            alt=""
          />
          <div className="coin-name">{coin}</div>
        </div>
      ))}
    </>
  );

  return (
    <div
      className={`assetPlatformTable ${coinToDetail === null} ${
        fullScreen ? ' fullScreen' : ''
      }`}
    >
      <div className="assetTableControlls">
        <div className={`bt-asset ${isAsset}`} onClick={() => setIsAsset(true)}>
          By Asset
        </div>
        <div
          className={`bt-asset platform ${!isAsset}`}
          onClick={() => setIsAsset(false)}
        >
          By Defi Network
          <div
            className="platform-select px-3"
            onClick={() => {
              setContentSideBar({
                head: (
                  <div className="tab-itm order-1 true title">
                    Select Platform
                  </div>
                ),
                content: platformList,
              });
            }}
          >
            <div className="btn-togle mx-auto">
              <img
                src={
                  (coinListObject &&
                    coinListObject[coinSelect] &&
                    coinListObject[coinSelect].coinImage) ||
                  all
                }
                alt=""
              />
              {coinSelect}
            </div>
          </div>
        </div>
        {isAsset ? (
          coinToDetail ? (
            <div className="m-auto"></div>
          ) : (
            <label className="searchWrapper">
              <input
                value={search}
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${searchTitle}`}
              />
              <FontAwesomeIcon icon={faSearch} />
              {search ? (
                <div className="menu" onClick={() => setSearch('')}>
                  {coinList
                    .filter(
                      (coin) =>
                        coin.coinName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        coin.coinSymbol
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((coin) => (
                      <div
                        key={coin._id}
                        className="btn-togle"
                        onClick={() => setCoinSelect(coin)}
                      >
                        <img src={coin.coinImage} alt="" />
                        {coin.coinName}
                        <span className="platform">{coin.coinSymbol}</span>
                      </div>
                    ))}
                </div>
              ) : (
                ''
              )}
            </label>
          )
        ) : (
          <div className="coinsSelect">
            <div
              className={`coinBtn ${coinSelect === 'USDT'}`}
              onClick={() => setCoinSelect('USDT')}
            >
              <img src={usdt} alt="" />
            </div>
            <div
              className={`coinBtn ${coinSelect === 'ETH'}`}
              onClick={() => setCoinSelect('ETH')}
            >
              <img src={eth} alt="" />
            </div>
            <label className={`searchBtn ${searchOpen}`}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
              />
              <div
                className="btnS"
                onClick={() => {
                  if (searchOpen) {
                    setSearch('');
                  }
                  setSearchOpen(!searchOpen);
                }}
              >
                <FontAwesomeIcon icon={searchOpen ? faTimes : faSearch} />
              </div>
              {search ? (
                <div className="menu" onClick={() => setSearch('')}>
                  {tokenList
                    .filter((coin) =>
                      coin.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((coin) => (
                      <div
                        key={coin}
                        className="btn-togle"
                        onClick={() => setCoinSelect(coin)}
                      >
                        <img
                          src={
                            (coinListObject &&
                              coinListObject[coin] &&
                              coinListObject[coin].coinImage) ||
                            all
                          }
                          alt=""
                        />
                        <span className="platform">{coin}</span>
                      </div>
                    ))}
                </div>
              ) : (
                ''
              )}
            </label>
          </div>
        )}
        <img
          onClick={() => setFullScreen(!fullScreen)}
          className="fullIcon"
          src={fullScreen ? fullScreenIconExit : fullScreenIcon}
          alt=""
        />
      </div>
      {coinToDetail ? (
        <VaultContextProvider>
          <CoinDetailTable
            isAsset={isAsset}
            coinToDetail={coinToDetail}
            setCoinToDetail={setCoinToDetail}
            stepOne={searchTitle}
            root={'Earn'}
          />
        </VaultContextProvider>
      ) : (
        <Scrollbars autoHide className="tableScrollWrapper">
          {isAsset ? (
            <AssetTable setCoinToDetail={setCoinToDetail} coinList={coinList} />
          ) : (
            <PlatformTable
              setCoinToDetail={setCoinToDetail}
              coinSelect={coinSelect}
            />
          )}
        </Scrollbars>
      )}
    </div>
  );
}

export default AssetPlatformTable;
