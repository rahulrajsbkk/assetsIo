import React from 'react';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import logo from '../static/images/logo-text.svg';
import LoansCard from '../components/MarketPage/LoansCard/LoansCard';
function Markets() {
  return (
    <div className="markets-page">
      <div className="sidebar-markets">
        <div className="brand">
          <img src={logo} alt="" />
          <h3>Iced</h3>
        </div>
        <div className="markets-side-menu">
          <div className="menu-itm active">EARN INTEREST</div>
          <div className="sub-menu-itm">Historical rates</div>
          <div className="menu-itm">BORROW</div>
          <div className="sub-menu-itm">Historical rates</div>
          <div className="menu-itm">REFERENCE RATES</div>
          <div className="menu-itm">LOANS</div>
          <div className="sub-menu-itm">Originated</div>
          <div className="sub-menu-itm">Outstanding</div>
          <div className="sub-menu-itm">Repayments</div>
          <div className="menu-itm">COLLATERAL</div>
          <div className="sub-menu-itm">Supply / Collateral Added</div>
          <div className="sub-menu-itm">Collateral Ratio</div>
          <div className="sub-menu-itm">Collateral Liquidated</div>
        </div>
      </div>
      <div className="markets-content">
        <EarnIntrest />
        <LoansCard />
      </div>
    </div>
  );
}

export default Markets;
