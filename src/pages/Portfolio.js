/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Layout from '../Layout/Index';
import PortfolioContextProvider from '../context/PortfolioContext';
import PortfolioDashboard from '../components/Portfolio/PortfolioDashboard/PortfolioDashboard';

function Portfolio() {
  return (
    <PortfolioContextProvider>
      <Layout active="portfolio" className="vault-content">
        <PortfolioDashboard />
      </Layout>
    </PortfolioContextProvider>
  );
}

export default Portfolio;
