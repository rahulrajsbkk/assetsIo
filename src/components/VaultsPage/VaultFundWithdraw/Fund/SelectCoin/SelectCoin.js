/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import AssetItem from './AssetItem';

function SelectCoin({
  setCoinObject,
  setIsCoinSelected,
  price,
  transCoin,
  fundOrWithdraw,
  setTransCoin,
  priceList,
  isDeposit,
}) {
  const [tab, setTab] = useState('Crypto');
  const [searchStr, setSearchStr] = useState('');

  const [searchList, setSearchList] = useState(priceList);

  useEffect(() => {
    setSearchList(
      priceList.filter(
        (listItm) =>
          (listItm.coinName.toLowerCase().includes(searchStr.toLowerCase()) ||
            listItm.coinSymbol
              .toLowerCase()
              .includes(searchStr.toLowerCase())) &&
          listItm.asset_type === tab
      )
    );
  }, [searchStr, tab, priceList]);

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
          className={`tab-itm col-6 ${tab === 'Fiat' ? 'active' : ''}`}
          onClick={() => {
            setTab('Fiat');
          }}
        >
          Fiat
        </div>
      </div>
      <div className="asset-list">
        {searchList
          .filter((item) => item.coinValueUSD > 0 || !isDeposit)
          .map((item) => {
            return (
              <AssetItem
                key={item.coinSymbol}
                img={item.coinImage}
                name={item.coinName}
                crypto={item.crypto}
                price={item.coinValueUSD}
                coinObject={price[item.coinSymbol]}
                symbol={item.coinSymbol}
                setCoinObject={setCoinObject}
                transCoin={transCoin}
                setTransCoin={setTransCoin}
              />
            );
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
          Proceed To&nbsp;
          {fundOrWithdraw}
          &nbsp;With&nbsp;
          {transCoin}
          &nbsp;Vault
        </div>
      )}
    </div>
  );
}

export default SelectCoin;
