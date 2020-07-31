import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import AssetTable from './AssetTable';
import PlatformTable from './PlatformTable';

function AssetPlatformTable() {
  const [isAsset, setIsAsset] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="assetPlatformTable">
      <div className="assetTableControlls">
        <div className={`bt-asset ${isAsset}`} onClick={() => setIsAsset(true)}>
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
            <FontAwesomeIcon icon={faCaretDown} />
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
      </div>
      <Scrollbars autoHide className="tableScrollWrapper">
        {isAsset ? <AssetTable /> : <PlatformTable />}
      </Scrollbars>
    </div>
  );
}

export default AssetPlatformTable;
