/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../Layout/Index';
import { BankContext } from '../context/Context';
import HeadTabs from '../components/HeadTabs/HeadTabs';
import NetWorthChart from '../components/NetWorthPage/NetWorthChart';
import NetWorthCards from '../components/NetWorthPage/NetWorthCards';
import NetWorthContextProvider from '../context/ NetWorthContext';

function NetWorthPage() {
  const { email } = useContext(BankContext);
  //   if (!email) {
  //     return <Redirect to="/" />;
  //   }
  return (
    <Layout active="portfolio" className="vault-content">
      <HeadTabs />
      <NetWorthContextProvider>
        <div className="netWorthLayout">
          <NetWorthChart />
          <NetWorthCards />
        </div>
      </NetWorthContextProvider>
    </Layout>
  );
}

export default NetWorthPage;
