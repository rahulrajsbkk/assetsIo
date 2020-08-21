import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import BondsAssetTable from './BondsAssetTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import BondsListTable from './BondsListTable';
import allPlatformIcon from '../../../static/images/allPlatforms.svg';

function AssetBondsTable({
  coinList,
  searchTitle,
  coinToDetail,
  setCoinToDetail,
}) {
  const [isAsset, setIsAsset] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
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
            onClick={() => setDropDownOpen(!dropDownOpen)}
          >
            <div className="btn-togle">
              <img src={allPlatformIcon} alt="" />
              {'All Platforms'}
            </div>
            <span className="platform">1 Offering</span>
            <FontAwesomeIcon icon={dropDownOpen ? faCaretUp : faCaretDown} />
            {dropDownOpen ? (
              <div className="menu">
                {/* {coinList.map((coin) => ( */}
                <div className="btn-togle" onClick={() => {}}>
                  <img src={allPlatformIcon} alt="" />
                  {'All Platforms'}
                  <span className="platform">1 Offering</span>
                </div>
                {/* ))} */}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="onlyFiat">
          <span>Only Fiat</span>
          <div
            className={`switch ${onlyFiat}`}
            onClick={() => setOnlyFiat(!onlyFiat)}
          >
            <div className="switchControll"></div>
          </div>
          <span>Both</span>
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
      <Scrollbars autoHide className="tableScrollWrapper">
        {isAsset ? (
          <BondsAssetTable
            setCoinToDetail={setCoinToDetail}
            coinList={coinList}
          />
        ) : (
          <BondsListTable />
        )}
      </Scrollbars>
    </div>
  );
}

export default AssetBondsTable;
