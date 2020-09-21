/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../Layout/Index';
import { BankContext } from '../context/Context';
import HeadTabs from '../components/HeadTabs/HeadTabs';
import NetWorthChart from '../components/NetWorthPage/NetWorthChart';
import NetWorthCards from '../components/NetWorthPage/NetWorthCards';
import IceSidebar from '../components/IceSidebar/IceSidebar';

function NetWorthPage({ match }) {
  const { email, iceSidebarOpen } = useContext(BankContext);

  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <Layout active="networth" className="vault-content">
      <HeadTabs />
      <div className="netWorthLayout">
        <div className={`netWorthContent ${iceSidebarOpen}`}>
          <NetWorthChart match={match} />
          <NetWorthCards />
        </div>
        {iceSidebarOpen ? <IceSidebar /> : ''}
      </div>
    </Layout>
  );
}

export default NetWorthPage;
