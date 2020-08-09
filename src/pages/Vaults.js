/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Layout from '../Layout/Index';
import VaultDashBoard from '../components/Vaults/VaultDashBoard/VaultDashBoard';
import VaultCreateNewContract from '../components/Vaults/VaultCreateNewContract/VaultCreateNewContract';
import VaultContextProvider from '../context/VaultContext';

function Vaults() {
  return (
    <VaultContextProvider>
      <Layout active="portfolio" className="vault-content">
        <VaultDashBoard />
        <VaultCreateNewContract />
      </Layout>
    </VaultContextProvider>
  );
}

export default Vaults;
