import React from 'react';
import { ReactComponent as DashSvg } from '../static/images/mobile-footer-icon/dash.svg';
import { ReactComponent as ContractSvg } from '../static/images/mobile-footer-icon/contract.svg';
import { ReactComponent as CoinInvestSvg } from '../static/images/mobile-footer-icon/coinvest.svg';
import { ReactComponent as MortageSvg } from '../static/images/mobile-footer-icon/mortage.svg';
import { ReactComponent as ProfileSvg } from '../static/images/mobile-footer-icon/profile.svg';
import { ReactComponent as IceSvg } from '../static/images/logo.svg';

function MobileFooter({ menuSelected, setTitle, setMenuSelected }) {
  return (
    <div className="mobile-footer">
      <div
        className={`footer-itm ${menuSelected === 'earn-intrest'}`}
        onClick={() => {
          try {
            setMenuSelected('earn-intrest');
            setTitle('Earn Interest');
          } catch (error) {}
        }}
      >
        <DashSvg />
        <div className="tab-name">Lend</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'bonds-tab'}`}
        onClick={() => {
          try {
            setMenuSelected('bonds-tab');
            setTitle('Earn Interest');
          } catch (error) {}
        }}
      >
        <MortageSvg />
        <div className="tab-name">Bonds</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'payouts'}`}
        onClick={() => {
          try {
            setMenuSelected('payouts');
            setTitle('Payouts');
          } catch (error) {}
        }}
      >
        <IceSvg />
        <div className="tab-name">Payouts</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'loan'}`}
        onClick={() => {
          // try {
          //   setMenuSelected('loan');
          //   setTitle('Loans');
          // } catch (error) {}
        }}
      >
        <CoinInvestSvg />
        <div className="tab-name">Loans</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'collateral'}`}
        onClick={() => {
          // try {
          //   setMenuSelected('collateral');
          //   setTitle('COLLATERAL');
          // } catch (error) {}
        }}
      >
        <ProfileSvg />
        <div className="tab-name">Collateral</div>
      </div>
    </div>
  );
}

export default MobileFooter;
