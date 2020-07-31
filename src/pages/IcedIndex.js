import React, { useState } from 'react';

import Layout from '../Layout/Index';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import LoansCard from '../components/MarketPage/EarnIntrest/LoansCard/LoansCard';
import HistoricalRates from '../components/MarketPage/HistoricalRates/HistoricalRates';
import Loans from '../components/MarketPage/Loans/Loans';
import Collateral from '../components/MarketPage/Collateral/Collateral';

function IcedIndex() {
  const [title, setTitle] = useState('Earn Interest');
  const [menuSelected, setMenuSelected] = useState('earn-intrest');

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
    <Layout active="icedIndex" className="icedIndex">
      <div className="tab">
        <div
          className={`tab-itm ${menuSelected === 'earn-intrest'}`}
          onClick={() => {
            setMenuSelected('earn-intrest');
            setTitle('Earn Interest');
          }}
        >
          Lend
        </div>
        <div
          className={`tab-itm ${menuSelected === 'earn-history'}`}
          onClick={() => {
            setMenuSelected('earn-history');
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
          Borrow
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
          Collareral
        </div>
      </div>
      <div className="content-section">{getPageContent(menuSelected)}</div>
    </Layout>
  );
}

export default IcedIndex;
