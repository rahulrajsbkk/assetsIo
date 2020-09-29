import React from 'react';
import { FormatCurrency } from '../../../../../utils/FunctionTools';

function AssetItem({
  img,
  name,
  symbol,
  setCoinObject,
  coinObject,
  transCoin,
  setTransCoin,
  isDeposit,
}) {
  return (
    <div
      className={`asset-item ${symbol === transCoin ? 'active' : ''}`}
      tabIndex="0"
      role="button"
    >
      <img src={img} className="icon my-auto" alt="" />
      <div className="name">{name}</div>
      <div className="amount">
        {FormatCurrency(coinObject && coinObject.coinValue, symbol)}
        <small>{symbol}</small>
      </div>
      {isDeposit ? (
        <div
          className="deposit inv"
          onClick={() => {
            setTransCoin(symbol);
            setCoinObject(coinObject);
          }}
        >
          Withdraw
        </div>
      ) : (
        <div
          className="deposit"
          onClick={() => {
            setTransCoin(symbol);
            setCoinObject(coinObject);
          }}
        >
          Deposit
        </div>
      )}
    </div>
  );
}

export default AssetItem;
