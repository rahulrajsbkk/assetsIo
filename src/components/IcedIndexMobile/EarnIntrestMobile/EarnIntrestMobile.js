import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import EarnIntrestControll from '../../MarketPage/EarnIntrest/EarnIntrestControll';
import usdt from '../../../static/images/coin-color/tether.svg';
import AssetTableMobile from './AssetTableMobile';

function EarnIntrestMobile() {
  const [isAsset, setIsAsset] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={''} />
      <div className={`assetPlatformTable `}>
        <div className="assetTableControlls">
          <div
            className={`bt-asset ${isAsset}`}
            onClick={() => setIsAsset(true)}
          >
            Asset
          </div>
          <div
            className={`bt-asset ${!isAsset}`}
            onClick={() => setIsAsset(false)}
          >
            {/* {!isAsset ? 'By Platform For ' : 'Platform '} */}
            Platform
            <div
              className="platform-select"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <div className="btn-togle">
                <img src={usdt} alt="" />
                USDT
              </div>
              <span className="platform">2 Platforms</span>
              <FontAwesomeIcon icon={dropDownOpen ? faCaretUp : faCaretDown} />
              {dropDownOpen ? (
                <div className="menu">
                  <div className="btn-togle">
                    <img src={usdt} alt="" />
                    USDT
                    <span className="platform">2 Platforms</span>
                  </div>
                  <div className="btn-togle">
                    <img src={usdt} alt="" />
                    USDT
                    <span className="platform">2 Platforms</span>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {isAsset ? <AssetTableMobile /> : ''}
      </div>
    </div>
  );
}

export default EarnIntrestMobile;
