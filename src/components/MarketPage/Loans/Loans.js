import React from 'react';
import ShowAmountIn from './ShowAmountIn';
import LoanControlls from './LoanControlls';
import LoanOriginatedCard from './LoanOriginatedCard';
import LoanOutstandingCard from './LoanOutstandingCard';
import LoanRepaymentsCard from './LoanRepaymentsCard';

function Loans() {
  return (
    <div className="loans-content">
      <h2>Loans</h2>
      <ShowAmountIn />
      <LoanControlls />
      <LoanOriginatedCard />
      <LoanOutstandingCard />
      <LoanRepaymentsCard />
    </div>
  );
}

export default Loans;
