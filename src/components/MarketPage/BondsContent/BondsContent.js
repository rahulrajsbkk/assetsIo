import React, { useState, useEffect, useContext } from 'react';
import { BankContext } from '../../../context/Context';
import AnalyticsEarn from '../EarnIntrest/AnalyticsEarn';
import AssetBondsTable from './AssetBondsTable';
import BondsControll from './BondsControll';

function BondsContent({ title }) {
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
      <BondsControll title={title} setAssetTab={setAssetTab} />
      <AssetBondsTable
        coinList={filterList}
        searchTitle={searchTitle}
        coinToDetail={coinToDetail}
        setCoinToDetail={setCoinToDetail}
      />
      {coinToDetail !== null ? <AnalyticsEarn /> : ''}
    </div>
  );
}

export default BondsContent;
