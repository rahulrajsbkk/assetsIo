import React from 'react';
import { ReactComponent as DashSvg } from '../static/images/mobile-footer-icon/dash.svg';
import { ReactComponent as ContractSvg } from '../static/images/mobile-footer-icon/contract.svg';
import { ReactComponent as CoinInvestSvg } from '../static/images/mobile-footer-icon/coinvest.svg';
import { ReactComponent as MortageSvg } from '../static/images/mobile-footer-icon/mortage.svg';
import { ReactComponent as ProfileSvg } from '../static/images/mobile-footer-icon/profile.svg';

function MobileFooter() {
  return (
    <div className="mobile-footer">
      <div className="footer-itm">
        <DashSvg />
      </div>
      <div className="footer-itm">
        <ContractSvg />
      </div>
      <div className="footer-itm">
        <MortageSvg />
      </div>
      <div className="footer-itm">
        <CoinInvestSvg />
      </div>
      <div className="footer-itm">
        <ProfileSvg />
      </div>
    </div>
  );
}

export default MobileFooter;
