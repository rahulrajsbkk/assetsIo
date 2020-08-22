import React, { useState } from 'react';

import Layout from '../Layout/Index';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
// import LoansCard from '../components/MarketPage/EarnIntrest/LoansCard/LoansCard';
import HistoricalRates from '../components/MarketPage/HistoricalRates/HistoricalRates';
import Loans from '../components/MarketPage/Loans/Loans';
import Collateral from '../components/MarketPage/Collateral/Collateral';
import useWindowDimensions from '../utils/WindowSize';
import BondsContent from '../components/MarketPage/BondsContent/BondsContent';
import IndexContextProvider from '../context/IndexContext';

function IcedIndex() {
  const [title, setTitle] = useState('Earn Interest');
  const [menuSelected, setMenuSelected] = useState('earn-intrest');
  const { width } = useWindowDimensions();
  function getPageContent(tab) {
    switch (tab) {
      case 'bonds-tab':
        return (
          <>
            <BondsContent title={title} />
          </>
        );
      case 'borrow-intrest':
        return (
          <>
            <HistoricalRates title={title} />
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
      case 'collateral':
        return <Collateral />;

      default:
        return (
          <>
            <EarnIntrest title={title} />
            {/* <LoansCard /> */}
          </>
        );
    }
  }

  return (
    <IndexContextProvider>
      <Layout
        active="index"
        className="icedIndex"
        menuSelected={menuSelected}
        setTitle={setTitle}
        setMenuSelected={setMenuSelected}
      >
        {width > 768 ? (
          <div className="tab">
            <div
              className={`tab-itm ${menuSelected === 'earn-intrest'}`}
              onClick={() => {
                setMenuSelected('earn-intrest');
                setTitle('Earn Interest');
              }}
            >
              Earn
            </div>
            <div
              className={`tab-itm ${menuSelected === 'bonds-tab'}`}
              onClick={() => {
                setMenuSelected('bonds-tab');
                setTitle('Earn Interest');
              }}
            >
              Bonds
            </div>
            <div
              className={`tab-itm ${menuSelected === 'borrow-intrest'}`}
              onClick={() => {
                setMenuSelected('borrow-intrest');
                setTitle('Borrow');
              }}
            >
              Indicies
            </div>
            <div
              className={`tab-itm ${menuSelected === 'loan'}`}
              onClick={() => {
                setMenuSelected('loan');
                setTitle('Loans');
              }}
            >
              Loans
            </div>
            <div
              className={`tab-itm ${menuSelected === 'collateral'}`}
              onClick={() => {
                setMenuSelected('collateral');
                setTitle('COLLATERAL');
              }}
            >
              Ice Machine
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="content-section">{getPageContent(menuSelected)}</div>
      </Layout>
    </IndexContextProvider>
  );
}

export default IcedIndex;
