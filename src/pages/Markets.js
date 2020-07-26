import React, { useState } from 'react';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import logo from '../static/images/logo-text.svg';
import LoansCard from '../components/MarketPage/EarnIntrest/LoansCard/LoansCard';
import HistoricalRates from '../components/MarketPage/HistoricalRates/HistoricalRates';
import Loans from '../components/MarketPage/Loans/Loans';
function Markets() {
  const [menuSelected, setMenuSelected] = useState('earn-intrest');
  const [title, setTitle] = useState('Earn Interest');
  function getPageContent(tab) {
    switch (tab) {
      case 'earn-history':
        return (
          <>
            <HistoricalRates title={title} />
          </>
        );
      case 'borrow-intrest':
        return (
          <>
            <EarnIntrest title={title} />
            <LoansCard />
          </>
        );
      case 'borrow-history':
        return (
          <>
            <HistoricalRates title={title} />
          </>
        );
      case 'reference-rates':
        return (
          <>
            <HistoricalRates title={title} />
          </>
        );
      case 'loan':
        return <Loans />;

      default:
        return (
          <>
            <EarnIntrest title={title} />
            <LoansCard />
          </>
        );
    }
  }

  return (
    <div className="markets-page">
      <div className="sidebar-markets">
        <div className="brand">
          <img src={logo} alt="" />
          <h3>Iced</h3>
        </div>
        <div className="markets-side-menu">
          <div
            className={`menu-itm${
              menuSelected === 'earn-intrest' ? ' active' : ''
            }`}
            onClick={() => {
              setMenuSelected('earn-intrest');
              setTitle('Earn Interest');
            }}
          >
            EARN INTEREST
          </div>
          <div
            className={`sub-menu-itm${
              menuSelected === 'earn-history' ? ' active' : ''
            }`}
            onClick={() => {
              setMenuSelected('earn-history');
              setTitle('Earn Interest');
            }}
          >
            Historical rates
          </div>
          <div
            className={`menu-itm${
              menuSelected === 'borrow-intrest' ? ' active' : ''
            }`}
            onClick={() => {
              setMenuSelected('borrow-intrest');
              setTitle('Borrow');
            }}
          >
            BORROW
          </div>
          <div
            className={`sub-menu-itm${
              menuSelected === 'borrow-history' ? ' active' : ''
            }`}
            onClick={() => {
              setMenuSelected('borrow-history');
              setTitle('Borrow');
            }}
          >
            Historical rates
          </div>
          <div
            className={`menu-itm${
              menuSelected === 'reference-rates' ? ' active' : ''
            }`}
            onClick={() => {
              setMenuSelected('reference-rates');
              setTitle('Reference Rates');
            }}
          >
            REFERENCE RATES
          </div>
          <div
            className={`menu-itm${menuSelected === 'loan' ? ' active' : ''}`}
            onClick={() => {
              setMenuSelected('loan');
              setTitle('Loans');
            }}
          >
            LOANS
          </div>
          <a
            href="#loan-originated"
            onClick={() => {
              setMenuSelected('loan');
              setTitle('Loans');
            }}
            className="sub-menu-itm"
          >
            Originated
          </a>
          <a
            href="#loan-outstanding"
            onClick={() => {
              setMenuSelected('loan');
              setTitle('Loans');
            }}
            className="sub-menu-itm"
          >
            Outstanding
          </a>
          <a
            href="#loan-repay"
            onClick={() => {
              setMenuSelected('loan');
              setTitle('Loans');
            }}
            className="sub-menu-itm"
          >
            Repayments
          </a>
          <div className="menu-itm">COLLATERAL</div>
          <div className="sub-menu-itm">Supply / Collateral Added</div>
          <div className="sub-menu-itm">Collateral Ratio</div>
          <div className="sub-menu-itm">Collateral Liquidated</div>
        </div>
      </div>
      <div className="markets-content">{getPageContent(menuSelected)}</div>
    </div>
  );
}

export default Markets;
