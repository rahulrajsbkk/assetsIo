import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { BankContext } from '../context/Context';

function Home() {
  const { email } = useContext(BankContext);
  if (email && email !== '') {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
  return <Redirect to="/login" />;
}

export default Home;
