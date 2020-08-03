import React from 'react';
import usdt from '../../../static/images/coin-color/tether.svg';

function AssetTableMobile() {
  return (
    <div className="table">
      <div className="tableHead">
        <div className="coin">Coin</div>
        <div className="rate">Annual Rate</div>
      </div>
      <div className="tableRow">
        <div className="coin">
          <img src={usdt} alt="" /> Tether
        </div>
        <div className="rate">1.36 %</div>
      </div>
      <div className="tableRow">
        <div className="coin">
          <img src={usdt} alt="" /> Tether
        </div>
        <div className="rate">1.36 %</div>
      </div>
      <div className="tableRow">
        <div className="coin">
          <img src={usdt} alt="" /> Tether
        </div>
        <div className="rate">1.36 %</div>
      </div>
      <div className="tableRow">
        <div className="coin">
          <img src={usdt} alt="" /> Tether
        </div>
        <div className="rate">1.36 %</div>
      </div>
      <div className="tableRow">
        <div className="coin">
          <img src={usdt} alt="" /> Tether
        </div>
        <div className="rate">1.36 %</div>
      </div>
    </div>
  );
}

export default AssetTableMobile;
