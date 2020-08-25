import React, { useState, useEffect, useContext } from 'react';
import { BankContext } from '../../../context/Context';
import AnalyticsEarn from '../EarnIntrest/AnalyticsEarn';
import AssetBondsTable from './AssetBondsTable';
import BondsControll from './BondsControll';

function BondsContent({ title }) {
  const { coinList, liquidRatesObject } = useContext(BankContext);
  const [assetTab, setAssetTab] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [searchTitle, setSearchTitle] = useState('Stable Coins');
  const [coinToDetail, setCoinToDetail] = useState(null);
  useEffect(() => {
    if (liquidRatesObject && liquidRatesObject['BTC'])
      switch (assetTab) {
        case 'stableCoin':
          setFilterList(
            coinList.filter(
              (coin) =>
                coin.asset_type === 'Crypto' &&
                liquidRatesObject[coin.coinSymbol] &&
                liquidRatesObject[coin.coinSymbol].coin_metdata.stable_coin
            )
          );
          setSearchTitle('Stable Coins');
          break;
        case 'cryptoCoin':
          setFilterList(
            coinList.filter(
              (coin) =>
                coin.asset_type === 'Crypto' &&
                liquidRatesObject[coin.coinSymbol] &&
                !liquidRatesObject[coin.coinSymbol].coin_metdata.stable_coin
            )
          );
          setSearchTitle('Crypto Currency');
          break;
        case 'fiat currencies':
          setFilterList(coinList.filter((coin) => coin.asset_type === 'Fiat'));
          setSearchTitle('Fiat Currencies');
          break;
        default:
          setFilterList([]);
          break;
      }
  }, [assetTab, coinList, liquidRatesObject]);
  return (
    <div className="earn-intrest">
      <BondsControll title={title} setAssetTab={setAssetTab} />
      <AssetBondsTable
        coinList={filterList}
        searchTitle={searchTitle}
        coinToDetail={coinToDetail}
        setCoinToDetail={setCoinToDetail}
        assetTab={assetTab}
      />
      {coinToDetail !== null ? <AnalyticsEarn /> : ''}
    </div>
  );
}

export default BondsContent;
