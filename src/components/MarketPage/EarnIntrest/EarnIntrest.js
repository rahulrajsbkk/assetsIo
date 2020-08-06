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
      <AnalyticsEarn />
    </div>
  );
}

export default EarnIntrest;
