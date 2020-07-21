/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Layout from '../Layout/Index';
import VaultDashBoard from '../components/Vaults/VaultDashBoard/VaultDashBoard';
import VaultCreateNewContract from '../components/Vaults/VaultCreateNewContract/VaultCreateNewContract';

function Vaults() {
  return (
    <Layout active="vaults" className="vault-content">
      <VaultDashBoard />
      <VaultCreateNewContract />
    </Layout>
  );
}

export default Vaults;
