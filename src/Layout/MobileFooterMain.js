import React from 'react';
import { ReactComponent as DashSvg } from '../static/images/mobile-footer-icon/dash.svg';
import { ReactComponent as CoinInvestSvg } from '../static/images/mobile-footer-icon/coinvest.svg';
import { ReactComponent as MortageSvg } from '../static/images/mobile-footer-icon/mortage.svg';
import { ReactComponent as ProfileSvg } from '../static/images/mobile-footer-icon/profile.svg';
import { ReactComponent as IceSvg } from '../static/images/logo.svg';
import { Link } from 'react-router-dom';

function MobileFooterMain({ active }) {
  return (
    <div className="mobile-footer">
      <Link to="/" className={`footer-itm ${active === 'networth'}`}>
        <DashSvg />
        <div className="tab-name">NetWorth</div>
      </Link>
      <Link to="/bonds" className={`footer-itm ${active === 'bonds'}`}>
        <MortageSvg />
        <div className="tab-name">Bonds</div>
      </Link>
      <Link
        to="/globalPayments"
        className={`footer-itm ${active === 'globalPayments'}`}
      >
        <IceSvg />
        <div className="tab-name">Global Payments</div>
      </Link>
      <Link to="/vault" className={`footer-itm ${active === 'vaults'}`}>
        <CoinInvestSvg />
        <div className="tab-name">Vaults</div>
      </Link>
      <Link to="/earning" className={`footer-itm ${active === 'earn'}`}>
        <ProfileSvg />
        <div className="tab-name">Fixed Income</div>
      </Link>
    </div>
  );
}

export default MobileFooterMain;
