/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Layout from '../Layout/Index';
import VaultFundWithdraw from '../components/Vaults/VaultFundWithdraw';
import VaultDashBoard from '../components/Vaults/VaultDashBoard/VaultDashBoard';

function Vaults() {
  return (
    <Layout active="vaults" className="vault-content">
      <VaultDashBoard />
      <VaultFundWithdraw />
    </Layout>
  );
}

export default Vaults;
