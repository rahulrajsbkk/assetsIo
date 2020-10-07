import React, { useState, useEffect, useContext } from 'react';
import btc from '../../../Static/image/btc.svg';
import eth from '../../../Static/image/eth.svg';
import usdt from '../../../Static/image/usdt.svg';
import usd from '../../../Static/image/usd.svg';
import AssetItem from './AssetItem';
import { OptionsContext } from '../../../ContextAPI/OptionContext';
import Axios from 'axios';

function SelectCoin({ setCoinObject, setIsCoinSelected, price }) {
  const { email, transCoin } = useContext(OptionsContext);
  const [tab, setTab] = useState('Crypto');
  const [searchStr, setSearchStr] = useState('');
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
        <i className="fas fa-search my-auto" />{' '}
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
          className={'tab-itm col-6 ' + (tab === 'Crypto' ? 'active' : '')}
          onClick={() => {
            setTab('Crypto');
          }}
        >
          Crypto
        </div>
        <div
          className={'tab-itm col-6 ' + (tab === 'Vault' ? 'active' : '')}
          onClick={() => {
            setTab('Vault');
          }}
        >
          Vault
        </div>
      </div>
      <div className="asset-list">
        {searchList.map((item) => {
          if (price && price[item.symbol] && price[item.symbol].value > 0)
            return (
              <AssetItem
                img={item.img}
                name={item.name}
                crypto={item.crypto}
                price={price[item.symbol].value}
                coinObject={price[item.symbol]}
                symbol={item.symbol}
                setCoinObject={setCoinObject}
              />
            );
        })}
      </div>
      {transCoin === '' ? (
        <h4 className="deposit-footer">Select The Vault</h4>
      ) : (
        <h4 className="deposit-footer" onClick={() => setIsCoinSelected(true)}>
          Proceed To Fund With {transCoin} Vault
        </h4>
      )}
    </div>
  );
}

export default SelectCoin;
