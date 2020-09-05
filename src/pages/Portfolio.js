/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../Layout/Index';
import PortfolioDashboard from '../components/Portfolio/PortfolioDashboard/PortfolioDashboard';
import { BankContext } from '../context/Context';

function Portfolio() {
  const { email } = useContext(BankContext);
  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <Layout active="portfolio" className="vault-content">
      <PortfolioDashboard />
    </Layout>
  );
}

export default Portfolio;
