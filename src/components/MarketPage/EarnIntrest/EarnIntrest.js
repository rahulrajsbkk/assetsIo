import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
// import EarnIntrestTable from './EarnIntrestTable';
import EarnIntrestControll from './EarnIntrestControll';
import AssetPlatformTable from './AssetPlatformTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import { BankContext } from '../../../context/Context';

function EarnIntrest({ title }) {
  const { coinList } = useContext(BankContext);
  const [isAsset, setIsAsset] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [assetTab, setAssetTab] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('Stable Coins');
  const [coinSelect, setCoinSelect] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    switch (assetTab) {
      case 'stableCoin':
        setFilterList(coinList.filter((coin) => coin.asset_type === 'Fiat'));
        setSearchTitle('Stable Coins');
        break;
      case 'cryptoCoin':
        setFilterList(coinList.filter((coin) => coin.asset_type === 'Crypto'));
        setSearchTitle('Crypto Currency');
        break;
      case 'indices':
        setFilterList([]);
        setSearchTitle('Indices');
        break;
      default:
        setFilterList([]);
        break;
    }
  }, [assetTab, coinList]);
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={title} setAssetTab={setAssetTab} />
      <AssetPlatformTable coinList={filterList} searchTitle={searchTitle} />
      <div className={`areaBelowTable ${fullScreen ? ' fullScreen' : ''}`}>
        <div className="assetTableControlls">
          <div
            className={`bt-asset ${isAsset}`}
            onClick={() => setIsAsset(true)}
          >
            By Asset
          </div>
          <div
            className={`bt-asset ${!isAsset}`}
            onClick={() => setIsAsset(false)}
          >
            {!isAsset ? 'By Platform For ' : 'By Platform '}
            <div
              className="platform-select"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <div className="btn-togle">
                <img src={coinSelect.coinImage} alt="" />
                {coinSelect.coinSymbol}
              </div>
              <span className="platform">2 Platforms</span>
              <FontAwesomeIcon icon={dropDownOpen ? faCaretUp : faCaretDown} />
              {dropDownOpen ? (
                <div className="menu">
                  {coinList.map((coin) => (
                    <div
                      className="btn-togle"
                      onClick={() => setCoinSelect(coin)}
                    >
                      <img src={coin.coinImage} alt="" />
                      {coin.coinSymbol}
                      <span className="platform">2 Platforms</span>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <label className="searchWrapper">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${searchTitle}`}
            />
            <FontAwesomeIcon icon={faSearch} />
            {search ? (
              <div className="menu">
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

          <img
            onClick={() => setFullScreen(!fullScreen)}
            className="fullIcon"
            src={fullScreen ? fullScreenIconExit : fullScreenIcon}
            alt=""
          />
        </div>
      </div>
      {/* <EarnIntrestTable /> */}
    </div>
  );
}

export default EarnIntrest;
