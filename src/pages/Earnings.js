import React from 'react';

import VaultContextProvider from '../context/VaultContext';
import Layout from '../Layout/Index';
import VaultPageHead from '../components/VaultsPage/VaultPageHead';
import VaultTransactionTable from '../components/VaultsPage/VaultTransactionTable';
import VaultControlls from '../components/VaultsPage/VaultControlls';
import VaultFab from '../components/VaultsPage/VaultFab';

function Earnings({ match }) {
  return (
    <VaultContextProvider>
      <Layout active={`vaults-${match.params.type}`} className="vaults">
        <VaultPageHead />
        <VaultControlls />
        <VaultTransactionTable
          credit={!(match.params.type === 'deposit')}
          debit={!(match.params.type === 'withdraw')}
        />
        <VaultFab />
      </Layout>
    </VaultContextProvider>
  );
}

export default Earnings;
