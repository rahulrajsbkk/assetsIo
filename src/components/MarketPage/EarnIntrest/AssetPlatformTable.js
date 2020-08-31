import React, { useState, useEffect, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AssetTable from './AssetTable';
import PlatformTable from './PlatformTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import CoinDetailTable from './CoinDetailTable';
import VaultContextProvider from '../../../context/VaultContext';
import { BankContext } from '../../../context/Context';

function AssetPlatformTable({
  coinList,
  searchTitle,
  coinToDetail,
  setCoinToDetail,
}) {
  const { setContentSideBar } = useContext(BankContext);
  const [isAsset, setIsAsset] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [coinSelect, setCoinSelect] = useState({});
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (coinList[0]) setCoinSelect(coinList[0]);
  }, [coinList]);
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
      {coinList.map((coin) => (
        <div
          className="coin"
          key={coin.coinSymbol}
          onClick={() => {
            setCoinSelect(coin);
            setContentSideBar({});
          }}
        >
          <img className="coin-logo mr-2" src={coin.coinImage} alt="" />
          <div className="coin-name">{coin.coinSymbol}</div>
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
          className={`bt-asset ${!isAsset}`}
          // onClick={() => setIsAsset(false)}
        >
          {!isAsset ? 'By Platform For ' : 'By Platform '}
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
              <img src={coinSelect.coinImage} alt="" />
              {coinSelect.coinSymbol}
            </div>
          </div>
        </div>
        {coinToDetail ? (
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
