/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import AssetItem from './AssetItem';

const btc = 'https://cryptolottery.com/static/media/btc.7d6ba19c.svg';
const eth = 'https://cryptolottery.com/static/media/eth.ff7418b5.svg';
const usdt = 'https://cryptolottery.com/static/media/usdt.1ad4bba3.svg';
const usd = 'https://cryptolottery.com/static/media/usd.71652581.svg';

const list = [
  {
    img: btc,
    symbol: 'BTC',
    name: 'Bitcoin',
    crypto: 'Crypto',
  },
  {
    img: eth,
    symbol: 'ETH',
    name: 'Ethereum',
    crypto: 'Crypto',
  },
  {
    img: usdt,
    symbol: 'USDT',
    name: 'Tether',
    crypto: 'Crypto',
  },
  {
    img: usd,
    symbol: 'USD',
    name: 'US Dollar',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'INR',
    name: 'Indian Rupee',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'GBP',
    name: 'British Pound',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'CAD',
    name: 'Canadian Dollar',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'AUD',
    name: 'Australian Dollar',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'EUR',
    name: 'Euro',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'CNY',
    name: 'Chinese Yuan',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'JPY',
    name: 'Japanese yen',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'AED',
    name: 'UAE Dirham',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'MXN',
    name: 'Mexican Peso',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'ARS',
    name: 'Argentine Peso',
    crypto: 'Vault',
  },
  {
    img: usd,
    symbol: 'COP',
    name: 'Colombian Peso',
    crypto: 'Vault',
  },
];

function SelectCoin({
  setCoinObject,
  setIsCoinSelected,
  price,
  transCoin,
  setTransCoin,
}) {
  const [tab, setTab] = useState('Crypto');
  const [searchStr, setSearchStr] = useState('');

  const [searchList, setSearchList] = useState(list);

  useEffect(() => {
    setSearchList(
      list.filter(
        (listItm) =>
          listItm.name.toLowerCase().includes(searchStr.toLowerCase()) &&
          listItm.crypto === tab
      )
    );
  }, [searchStr, tab]);

  return (
    <div className="select-coin">
      <div className="mx-4 my-3 d-flex search-wrap p-1">
        <i className="fas fa-search my-auto" />
        &nbsp;
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          className="search-input"
          placeholder="Search Assets"
        />
      </div>
      <div className="mx-4 tab-coins d-flex">
        <div
          tabIndex={0}
          role="button"
          className={`tab-itm col-6 ${tab === 'Crypto' ? 'active' : ''}`}
          onClick={() => {
            setTab('Crypto');
          }}
        >
          Crypto
        </div>
        <div
          tabIndex={0}
          role="button"
          className={`tab-itm col-6 ${tab === 'Vault' ? 'active' : ''}`}
          onClick={() => {
            setTab('Vault');
          }}
        >
          Fiat
        </div>
      </div>
      <div className="asset-list">
        {searchList.map((item) => {
          if (price && price[item.symbol] && price[item.symbol].value > 0) {
            return (
              <AssetItem
                img={item.img}
                name={item.name}
                crypto={item.crypto}
                price={price[item.symbol].value}
                coinObject={price[item.symbol]}
                symbol={item.symbol}
                setCoinObject={setCoinObject}
                transCoin={transCoin}
                setTransCoin={setTransCoin}
              />
            );
          }
          return <></>;
        })}
      </div>
      {transCoin === '' ? (
        <h4 className="deposit-footer">Select The Vault</h4>
      ) : (
        <div
          role="button"
          tabIndex={0}
          className="deposit-footer"
          onClick={() => setIsCoinSelected(true)}
        >
          Proceed To Fund With&nbsp;
          {transCoin}
          &nbsp;Vault
        </div>
      )}
    </div>
  );
}

export default SelectCoin;
