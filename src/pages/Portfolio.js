/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Layout from '../Layout/Index';
import VaultDashBoard from '../components/Portfolio/VaultDashBoard/VaultDashBoard';
import VaultCreateNewContract from '../components/Portfolio/VaultCreateNewContract/VaultCreateNewContract';
import PortfolioContextProvider from '../context/PortfolioContext';

function Portfolio() {
  return (
    <PortfolioContextProvider>
      <Layout active="portfolio" className="vault-content">
        <VaultDashBoard />
        <VaultCreateNewContract />
      </Layout>
    </PortfolioContextProvider>
  );
}

export default Portfolio;
