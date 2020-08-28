import React from 'react';

import Layout from '../Layout/Index';
import EarningPageHead from '../components/EarningsPage/EarningsPageHead';
import EarningsContextProvider from '../context/EarningsContext';
import EarningsTransactionTable from '../components/EarningsPage/EarningsTransactionTable';
import EarningsControlls from '../components/EarningsPage/EarningsControlls';

function Earnings({ match }) {
  return (
    <EarningsContextProvider>
      <Layout active={`vaults-${match.params.type}`} className="vaults">
        <EarningPageHead />
        <EarningsControlls />
        <EarningsTransactionTable
          credit={!(match.params.type === 'deposit')}
          debit={!(match.params.type === 'withdraw')}
        />
      </Layout>
    </EarningsContextProvider>
  );
}

export default Earnings;
