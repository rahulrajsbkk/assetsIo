import React, { useContext, useState } from 'react';
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
  const [openSelectApp, setOpenSelectApp] = useState(false);

  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <EarningsContextProvider>
      <Layout active="earn" className={`vaults ${openSelectApp}`} footerMain>
        <EarningPageHead />
        <EarningsControlls
          openSelectApp={openSelectApp}
          setOpenSelectApp={setOpenSelectApp}
        />
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
