import React, { useState, useEffect, useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';
import BondsListTable from './BondsListTable';
import { BankContext } from '../../../context/Context';
import VaultContextProvider from '../../../context/VaultContext';
import CoinDetailTable from '../EarnIntrest/CoinDetailTable';
import useWindowDimensions from '../../../utils/WindowSize';
import BondsListTableMobile from './BondsListTableMobile';

function AssetBondsTable({
  coinList,
  searchTitle,
  coinToDetail,
  setCoinToDetail,
  assetTab,
}) {
  const { setContentSideBar } = useContext(BankContext);
  const [fullScreen, setFullScreen] = useState(false);
  const [coinSelect, setCoinSelect] = useState({});
  const [search, setSearch] = useState('');

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (coinList[0]) setCoinSelect(coinList[0]);
  }, [coinList]);
  useEffect(() => {
    setCoinToDetail(null);
  }, [coinSelect, setCoinToDetail]);
  useEffect(() => {
    return () => {
      setContentSideBar({});
    };
  }, [setContentSideBar]);
  return (
    <div
      className={`assetPlatformTable ${coinToDetail === null} ${
        fullScreen ? ' fullScreen' : ''
      }`}
    >
      <div className="assetTableControlls">
        <div className={`bt-asset bond true`}>By Bonds</div>
        <div className={`bt-asset bond disable`}>By Asset</div>
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
            isAsset={false}
            coinToDetail={coinToDetail}
            setCoinToDetail={setCoinToDetail}
            stepOne={searchTitle}
            root={'Bonds'}
          />
        </VaultContextProvider>
      ) : width > 768 ? (
        <Scrollbars autoHide className={`tableScrollWrapper bonds`}>
          <BondsListTable
            assetTab={assetTab}
            setCoinToDetail={setCoinToDetail}
          />
        </Scrollbars>
      ) : (
        <BondsListTableMobile assetTab={assetTab} />
      )}
    </div>
  );
}

export default AssetBondsTable;
