import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../Layout/Index';
import useWindowDimensions from '../utils/WindowSize';
import IndexContextProvider from '../context/IndexContext';
import iceLogo from '../static/images/logo.svg';
import backDouble from '../static/images/backDouble.svg';
import IceSidebar from '../components/IceSidebar/IceSidebar';
import { BankContext } from '../context/Context';
import Indices from '../components/Indices/Indices';
import EnterPinUnlock from '../components/EnterPinUnlock/EnterPinUnlock';

function Options({ activeTab }) {
  const history = useHistory();
  const { iceSidebarOpen, setIceSidebarOpen } = useContext(BankContext);
  const [menuSelected, setMenuSelected] = useState('earn-intrest');
  const { width } = useWindowDimensions();
  const [pinModal, setPinModal] = useState(true);
  function getPageContent(tab) {
    switch (tab) {
      default:
        return (
          <>
            <Indices />
            {pinModal && (
              <EnterPinUnlock
                onSucces={() => setPinModal(false)}
                onClose={() => {
                  history.push('/');
                }}
              />
            )}
          </>
        );
    }
  }
  useEffect(() => {
    if (activeTab === 'bonds') setMenuSelected('bonds-tab');
    if (activeTab === 'globalPayments') setMenuSelected('payouts');
  }, [activeTab]);

  const details = [
    'Indicies Will Allow You To Create Your Own Index Funds In A Matter Of Seconds. Tap Into The Biggest Trends In The World Without The Risk Of Choosing The Right Asset. ',
    'Assets.io Has Created The Ice Protocol Which Enables Your To Digitalize Any Asset. Once Your Have Turned Your Assets Into Iced Assets, They Can Now Be Used As An Instrument On The Platform ',
    'The IceMachine Is The Interface To The IcedProtocol. It Allows Your To Interact WIth The Smart Contract & Lay The Abstraction Parameters For You Newly Created Iced Asset',
  ];
  const [detailIndex, setDetailIndex] = useState(null);

  return (
    <IndexContextProvider>
      <Layout
        active="Options"
        className="Options"
        menuSelected={menuSelected}
        setMenuSelected={setMenuSelected}
        hideFooter={true}
        footerMain={true}
      >
        <div className="icedContainer">
          <div className={`mainContent ${iceSidebarOpen}`}>
            {width > 768 ? (
              <div className="tab">
                <div
                  className={`tab-itm ${menuSelected === 'Assets'}`}
                  onClick={() => {
                    setMenuSelected('Assets');
                  }}
                >
                  Assets
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'Indicies'}`}
                  onClick={() => {
                    setMenuSelected('Indicies');
                  }}
                >
                  Indicies
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'Bonds'}`}
                  onClick={() => {
                    setMenuSelected('Bonds');
                  }}
                >
                  Bonds
                </div>
                <div
                  className={`tab-itm ${menuSelected === 'Funds'}`}
                  onClick={() => {
                    setMenuSelected('Funds');
                  }}
                  // onMouseEnter={() => setDetailIndex(1)}
                  // onMouseLeave={() => setDetailIndex(null)}
                >
                  Funds
                </div>
                <div
                  onClick={() => setIceSidebarOpen(!iceSidebarOpen)}
                  className={`tab-itm ice ${menuSelected === 'collateral'}`}
                >
                  <img src={iceSidebarOpen ? backDouble : iceLogo} alt="" />
                </div>
              </div>
            ) : (
              ''
            )}
            <div className={`content-section ${menuSelected}`}>
              {getPageContent(menuSelected)}
              {details[detailIndex] ? (
                <div
                  className={`overlayComingSoon det-${
                    detailIndex + 3
                  } ${iceSidebarOpen}`}
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
          {iceSidebarOpen ? <IceSidebar /> : ''}
        </div>
      </Layout>
    </IndexContextProvider>
  );
}

export default Options;
