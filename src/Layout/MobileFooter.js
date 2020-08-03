import React from 'react';
import { ReactComponent as DashSvg } from '../static/images/mobile-footer-icon/dash.svg';
import { ReactComponent as ContractSvg } from '../static/images/mobile-footer-icon/contract.svg';
import { ReactComponent as CoinInvestSvg } from '../static/images/mobile-footer-icon/coinvest.svg';
import { ReactComponent as MortageSvg } from '../static/images/mobile-footer-icon/mortage.svg';
import { ReactComponent as ProfileSvg } from '../static/images/mobile-footer-icon/profile.svg';

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
      </div>
      <div
        className={`footer-itm ${menuSelected === 'borrow-intrest'}`}
        onClick={() => {
          try {
            setMenuSelected('borrow-intrest');
            setTitle('Borrow');
          } catch (error) {}
        }}
      >
        <ContractSvg />
      </div>
      <div
        className={`footer-itm ${menuSelected === 'earn-history'}`}
        onClick={() => {
          try {
            setMenuSelected('earn-history');
            setTitle('Earn Interest');
          } catch (error) {}
        }}
      >
        <MortageSvg />
      </div>
      <div
        className={`footer-itm ${menuSelected === 'loan'}`}
        onClick={() => {
          try {
            setMenuSelected('loan');
            setTitle('Loans');
          } catch (error) {}
        }}
      >
        <CoinInvestSvg />
      </div>
      <div
        className={`footer-itm ${menuSelected === 'collateral'}`}
        onClick={() => {
          try {
            setMenuSelected('collateral');
            setTitle('COLLATERAL');
          } catch (error) {}
        }}
      >
        <ProfileSvg />
      </div>
    </div>
  );
}

export default MobileFooter;
