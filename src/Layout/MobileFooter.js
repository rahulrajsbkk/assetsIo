import React from 'react';
import { ReactComponent as DashSvg } from '../static/images/mobile-footer-icon/dash.svg';
import { ReactComponent as CoinInvestSvg } from '../static/images/mobile-footer-icon/coinvest.svg';
import { ReactComponent as MortageSvg } from '../static/images/mobile-footer-icon/mortage.svg';
import { ReactComponent as ProfileSvg } from '../static/images/mobile-footer-icon/profile.svg';
import { ReactComponent as IceSvg } from '../static/images/logo.svg';

function MobileFooter({ menuSelected, setMenuSelected }) {
  return (
    <div className="mobile-footer">
      <div
        className={`footer-itm ${menuSelected === 'earn-intrest'}`}
        onClick={() => {
          try {
            setMenuSelected('earn-intrest');
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
          } catch (error) {}
        }}
      >
        <IceSvg />
        <div className="tab-name">Payouts</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'indices'}`}
        onClick={() => {
          try {
            setMenuSelected('indices');
          } catch (error) {}
        }}
      >
        <CoinInvestSvg />
        <div className="tab-name">Indices</div>
      </div>
      <div
        className={`footer-itm ${menuSelected === 'bridge'}`}
        onClick={() => {
          try {
            setMenuSelected('bridge');
          } catch (error) {}
        }}
      >
        <ProfileSvg />
        <div className="tab-name">Bridge</div>
      </div>
    </div>
  );
}

export default MobileFooter;
