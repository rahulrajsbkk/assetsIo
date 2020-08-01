import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
// import EarnIntrestTable from './EarnIntrestTable';
import EarnIntrestControll from './EarnIntrestControll';
import AssetPlatformTable from './AssetPlatformTable';
import fullScreenIcon from '../../../static/images/fullScreen.svg';
import fullScreenIconExit from '../../../static/images/fullScreenExit.svg';

function EarnIntrest({ title }) {
  const [isAsset, setIsAsset] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={title} />
      <AssetPlatformTable />
      <div className={`areaBelowTable ${fullScreen ? ' fullScreen' : ''}`}>
        <div className="assetTableControlls">
          <div
            className={`bt-asset ${isAsset}`}
            onClick={() => setIsAsset(true)}
          >
            By Asset
          </div>
          <div
            className={`bt-asset ${!isAsset}`}
            onClick={() => setIsAsset(false)}
          >
            {!isAsset ? 'By Platform For ' : 'By Platform '}
            <div
              className="platform-select"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <div className="btn-togle">
                <img
                  src="https://icedvault.com/static/media/tether.5c35de51.svg"
                  alt=""
                />
                USDT
              </div>
              <FontAwesomeIcon icon={dropDownOpen ? faCaretUp : faCaretDown} />
              {dropDownOpen ? (
                <div className="menu">
                  <div className="btn-togle">
                    <img
                      src="https://icedvault.com/static/media/tether.5c35de51.svg"
                      alt=""
                    />
                    USDT
                  </div>
                  <div className="btn-togle">
                    <img
                      src="https://icedvault.com/static/media/tether.5c35de51.svg"
                      alt=""
                    />
                    USDT
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <label className="searchWrapper">
            <input type="text" placeholder="Search Stablecoins" />
            <FontAwesomeIcon icon={faSearch} />
          </label>
          <img
            onClick={() => setFullScreen(!fullScreen)}
            className="fullIcon"
            src={fullScreen ? fullScreenIconExit : fullScreenIcon}
            alt=""
          />
        </div>
      </div>
      {/* <EarnIntrestTable /> */}
    </div>
  );
}

export default EarnIntrest;
