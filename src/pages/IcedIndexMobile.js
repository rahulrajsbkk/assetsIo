import React, { useState } from 'react';
import Layout from '../Layout/Index';
import HistoricalRates from '../components/MarketPage/HistoricalRates/HistoricalRates';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import Collateral from '../components/MarketPage/Collateral/Collateral';
import Loans from '../components/MarketPage/Loans/Loans';
import EarnIntrestMobile from '../components/IcedIndexMobile/EarnIntrestMobile/EarnIntrestMobile';

function IcedIndexMobile() {
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
            {/* <LoansCard /> */}
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
            <EarnIntrestMobile title={title} />
          </>
        );
    }
  }
  return (
    <Layout
      active="index"
      className="icedIndex"
      menuSelected={menuSelected}
      setTitle={setTitle}
      setMenuSelected={setMenuSelected}
    >
      <div className="contentSectionMobile">{getPageContent(menuSelected)}</div>
    </Layout>
  );
}

export default IcedIndexMobile;
