import React, { useState, useEffect, useContext } from 'react';
import EarnIntrestControll from './EarnIntrestControll';
import AssetPlatformTable from './AssetPlatformTable';
import { BankContext } from '../../../context/Context';
import AnalyticsEarn from './AnalyticsEarn';

function EarnIntrest({ title }) {
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
