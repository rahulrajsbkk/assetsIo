import React, { useState, useEffect, useContext } from 'react';
import EarnIntrestControll from './EarnIntrestControll';
import AssetPlatformTable from './AssetPlatformTable';
import { BankContext } from '../../../context/Context';
import AnalyticsEarn from './AnalyticsEarn';

function EarnIntrest({ title }) {
  const { coinList } = useContext(BankContext);
  const [assetTab, setAssetTab] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('Stable Coins');
  const [coinToDetail, setCoinToDetail] = useState(null);
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
      case 'iced assets':
        setFilterList([]);
        setSearchTitle('Iced Assets');
        break;
      default:
        setFilterList([]);
        break;
    }
  }, [assetTab, coinList]);
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={title} setAssetTab={setAssetTab} />
      <AssetPlatformTable
        coinList={filterList}
        searchTitle={searchTitle}
        coinToDetail={coinToDetail}
        setCoinToDetail={setCoinToDetail}
      />
      {coinToDetail !== null ? <AnalyticsEarn /> : ''}
    </div>
  );
}

export default EarnIntrest;
