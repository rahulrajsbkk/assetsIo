/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function AssetItem({
  img,
  name,
  price,
  symbol,
  setCoinObject,
  coinObject,
  transCoin,
  setTransCoin,
}) {
  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  function formatNum(num) {
    if (symbol === 'BTC' || symbol === 'ETH') {
      if (num >= 10) {
        return new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        }).format(num);
      }
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 4,
        minimumFractionDigits: 4,
      }).format(num);
    }
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  }
  return (
    <div
      className={`asset-item d-flex p-4 justify-content-between ${
        symbol === transCoin ? 'active' : ''
      }`}
      tabIndex="0"
      role="button"
      onClick={() => {
        setTransCoin(symbol);
        setCoinObject(coinObject);
      }}
    >
      <div className="d-flex col-5 px-2">
        <img src={img} className="icon my-auto" alt="" />
        <h4 className="mx-2">{name}</h4>
      </div>
      <h4 className="col p-0">{formatNum(coinObject.coinValue)}</h4>
      <h4 className="px-2">${usdAmountFormatter.format(price)}</h4>
    </div>
  );
}

export default AssetItem;
