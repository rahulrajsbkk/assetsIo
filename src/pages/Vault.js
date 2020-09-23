import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import VaultContextProvider from '../context/VaultContext';
import Layout from '../Layout/Index';
import VaultPageHead from '../components/VaultsPage/VaultPageHead';
import VaultTransactionTable from '../components/VaultsPage/VaultTransactionTable';
import VaultControlls from '../components/VaultsPage/VaultControlls';
import VaultFab from '../components/VaultsPage/VaultFab';
import { BankContext } from '../context/Context';

function Vault({ match }) {
  const { email } = useContext(BankContext);
  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <VaultContextProvider>
      <Layout active={`vaults`} className="vaults" footerMain>
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

export default Vault;
