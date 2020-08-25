import React, { useState, useEffect, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BondsAssetTable from './BondsAssetTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import BondsListTable from './BondsListTable';
import allPlatformIcon from '../../../static/images/allPlatforms.svg';
import { BankContext } from '../../../context/Context';
import VaultContextProvider from '../../../context/VaultContext';
import CoinDetailTable from '../EarnIntrest/CoinDetailTable';

function AssetBondsTable({
  coinList,
  searchTitle,
  coinToDetail,
  setCoinToDetail,
  assetTab,
}) {
  const { setContentSideBar } = useContext(BankContext);
  const [isAsset, setIsAsset] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [coinSelect, setCoinSelect] = useState({});
  const [search, setSearch] = useState('');

  const [onlyFiat, setOnlyFiat] = useState(true);
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
  }, []);
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
          onClick={() => setIsAsset(false)}
        >
          {!isAsset ? 'By Bond For ' : 'By Bond '}
          <div
            className="platform-select"
            onClick={() => {
              setContentSideBar({
                head: (
                  <div className="tab-itm order-1 true title">
                    Select Platform
                  </div>
                ),
                content: (
                  <div
                    className="coin"
                    onClick={() => {
                      setContentSideBar({});
                    }}
                  >
                    <img
                      className="coin-logo mr-2"
                      src={allPlatformIcon}
                      alt=""
                    />
                    <div className="coin-name">{'All Platforms'}</div>
                  </div>
                ),
              });
            }}
          >
            <div className="btn-togle mx-auto">
              <img src={allPlatformIcon} alt="" />
              {'All Platforms'}
            </div>
          </div>
        </div>
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
                    coin.coinSymbol.toLowerCase().includes(search.toLowerCase())
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
            root={'Bonds'}
          />
        </VaultContextProvider>
      ) : (
        <Scrollbars autoHide className="tableScrollWrapper">
          {isAsset ? (
            <BondsAssetTable
              setCoinToDetail={setCoinToDetail}
              coinList={coinList}
            />
          ) : (
            <BondsListTable assetTab={assetTab} />
          )}
        </Scrollbars>
      )}
    </div>
  );
}

export default AssetBondsTable;
