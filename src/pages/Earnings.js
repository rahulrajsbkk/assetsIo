import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../Layout/Index';
import EarningPageHead from '../components/EarningsPage/EarningsPageHead';
import EarningsContextProvider from '../context/EarningsContext';
import EarningsTransactionTable from '../components/EarningsPage/EarningsTransactionTable';
import EarningsControlls from '../components/EarningsPage/EarningsControlls';
import EarningsPageFab from '../components/EarningsPage/EarningsPageFab';
import { BankContext } from '../context/Context';

function Earnings({ match }) {
  const { email } = useContext(BankContext);
  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <EarningsContextProvider>
      <Layout active="earn" className="vaults">
        <EarningPageHead />
        <EarningsControlls />
        <EarningsTransactionTable
          credit={!(match.params.type === 'deposit')}
          debit={!(match.params.type === 'withdraw')}
        />
        <EarningsPageFab />
      </Layout>
    </EarningsContextProvider>
  );
}

export default Earnings;
