import React, { useState } from 'react';
import Layout from '../Layout/Index';
import HistoricalRates from '../components/MarketPage/HistoricalRates/HistoricalRates';
import EarnIntrest from '../components/MarketPage/EarnIntrest/EarnIntrest';
import Collateral from '../components/MarketPage/Collateral/Collateral';
import Loans from '../components/MarketPage/Loans/Loans';
import EarnIntrestMobile from '../components/IcedIndexMobile/EarnIntrestMobile/EarnIntrestMobile';
import BondsContent from '../components/MarketPage/BondsContent/BondsContent';
import IndexContextProvider, { IndexContext } from '../context/IndexContext';

function IcedIndexMobile() {
  const [title, setTitle] = useState('Earn Interest');
  const [menuSelected, setMenuSelected] = useState('earn-intrest');
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
    <IndexContextProvider>
      <Layout
        active="index"
        className="icedIndex"
        menuSelected={menuSelected}
        setTitle={setTitle}
        setMenuSelected={setMenuSelected}
      >
        <div className="contentSectionMobile">
          {getPageContent(menuSelected)}
        </div>
      </Layout>
    </IndexContextProvider>
  );
}

export default IcedIndexMobile;
