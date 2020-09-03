import React, { useState, useContext } from 'react';
import PortfolioContractsToBuyList from './PortfolioContractsToBuyList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { PortfolioContext } from '../../../context/PortfolioContext';

function PortfolioAssets() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { filterCurrency, setFilterCurrency } = useContext(PortfolioContext);
  return (
    <div className="portfolioAssets">
      <div className="assetsText">
        <div className="title">Compare Assets</div>
        <div className="detail">
          You Can Ice Any Of Your Verified Assets. On The Right Hand Side You
          Have All The Assets In Which You Have A Balane. Each Asset Has A
          Specific Liquid Rate, Base, &amp; Base Rate
        </div>
        <div className="bondTypes">
          <div className="bondTypesText">Bond Types: </div>
          <div className="drop-select">
            <div className="content" onClick={() => setMenuOpen(!menuOpen)}>
              {filterCurrency}
              <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
            </div>
            {menuOpen ? (
              <div className="menu">
                <div
                  className={`menuItem ${
                    filterCurrency === 'Cryptocurrency' ? 'd-none' : ''
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    setFilterCurrency('Cryptocurrency');
                  }}
                >
                  Cryptocurrency
                </div>
                <div
                  className={`menuItem ${
                    filterCurrency === 'StableCoin' ? 'd-none' : ''
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    setFilterCurrency('StableCoin');
                  }}
                >
                  StableCoin
                </div>
                <div
                  className={`menuItem ${
                    filterCurrency === 'Fiat Currencies' ? 'd-none' : ''
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    setFilterCurrency('Fiat Currencies');
                  }}
                >
                  Fiat Currencies
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="assetsContent">
        <PortfolioContractsToBuyList />
      </div>
    </div>
  );
}

export default PortfolioAssets;
