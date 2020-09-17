import React, { useState } from 'react';

import Layout from '../Layout/Index';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import useWindowDimensions from '../utils/WindowSize';
import BondsContent from '../components/MarketPage/BondsContent/BondsContent';
import IndexContextProvider from '../context/IndexContext';
import iceLogo from '../static/images/logo.svg';
import backDouble from '../static/images/backDouble.svg';
import IceSidebar from '../components/IceSidebar/IceSidebar';
import IcePayouts from '../components/MarketPage/IcePayouts/IcePayouts';
import IceIndices from '../components/MarketPage/IceIndices/IceIndices';
import IceAssets from '../components/MarketPage/IceAssets/IceAssets';

function IcedIndex() {
  const [menuSelected, setMenuSelected] = useState('earn-intrest');
  const { width } = useWindowDimensions();
  function getPageContent(tab) {
    switch (tab) {
      case 'bonds-tab':
        return (
          <>
            <BondsContent />
          </>
        );
      case 'payouts':
        return (
          <>
            <IcePayouts />
          </>
        );
      case 'indices':
        return (
          <>
            <IceIndices />
          </>
        );
      case 'assets':
        return (
          <>
            <IceAssets />
          </>
        );

      default:
        return (
          <>
            <EarnIntrest />
          </>
        );
    }
  }

  const details = [
    'Indicies Will Allow You To Create Your Own Index Funds In A Matter Of Seconds. Tap Into The Biggest Trends In The World Without The Risk Of Choosing The Right Asset. ',
    'Assets.io Has Created The Ice Protocol Which Enables Your To Digitalize Any Asset. Once Your Have Turned Your Assets Into Iced Assets, They Can Now Be Used As An Instrument On The Platform ',
    'The IceMachine Is The Interface To The IcedProtocol. It Allows Your To Interact WIth The Smart Contract & Lay The Abstraction Parameters For You Newly Created Iced Asset',
  ];
  const [detailIndex, setDetailIndex] = useState(null);

  const [iceOpen, setIceOpen] = useState(false);

  return (
    <IndexContextProvider>
      <Layout
        active="index"
        className="icedIndex"
        menuSelected={menuSelected}
        setMenuSelected={setMenuSelected}
      >
        <div className="icedContainer">
          <div className={`mainContent ${iceOpen}`}>
            {width > 768 ? (
              <div className="tab">
                <div
                  className={`tab-itm ${menuSelected === 'earn-intrest'}`}
                  onClick={() => {
                    setMenuSelected('earn-intrest');
                  }}
                >
                  Earn
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'bonds-tab'}`}
                  onClick={() => {
                    setMenuSelected('bonds-tab');
                  }}
                >
                  Bonds
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'borrow-intrest'}`}
                  // onClick={() => {
                  //   setMenuSelected('borrow-intrest');
                  // }}
                  onMouseEnter={() => setDetailIndex(0)}
                  onMouseLeave={() => setDetailIndex(null)}
                >
                  Indicies
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'loan'}`}
                  // onClick={() => {
                  //   setMenuSelected('loan');
                  // }}
                  onMouseEnter={() => setDetailIndex(1)}
                  onMouseLeave={() => setDetailIndex(null)}
                >
                  Assets
                </div>
                <div
                  onClick={() => setIceOpen(!iceOpen)}
                  className={`tab-itm ice ${menuSelected === 'collateral'}`}
                >
                  <img src={iceOpen ? backDouble : iceLogo} alt="" />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="content-section">
              {getPageContent(menuSelected)}
              {details[detailIndex] ? (
                <div
                  className={`overlayComingSoon det-${
                    detailIndex + 3
                  } ${iceOpen}`}
                  onMouseEnter={() => setDetailIndex(detailIndex)}
                >
                  <div
                    className="detail"
                    onMouseEnter={() => setDetailIndex(detailIndex)}
                    onMouseLeave={() => setDetailIndex(null)}
                  >
                    <div className="detailText">{details[detailIndex]}</div>
                    <div className="btComingSoon">Coming Soon!</div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          {iceOpen ? <IceSidebar /> : ''}
        </div>
      </Layout>
    </IndexContextProvider>
  );
}

export default IcedIndex;
