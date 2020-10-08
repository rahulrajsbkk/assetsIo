import React, { useState } from 'react';
// import CoinsSidebar from '../CoinsSidebar/CoinsSidebar';

function MainLayout({ children, className }) {
  const [isToken, setIsToken] = useState(true);
  const [tab, setTab] = useState('default');
  const tabItem = {
    default: children,
    token1: <h1>Token1</h1>,
    token2: <h1>Token2</h1>,
    token3: <h1>Token3</h1>,
  };
  return (
    <div className={'d-flex ' + (!isToken ? 'terminal ' : '') + className}>
      <div className={'opt-layout d-flex flex-column'}>
        <div className="flex-grow-1 d-flex flex-column">{tabItem[tab]}</div>
      </div>
      {/* <CoinsSidebar isToken={isToken} /> */}
    </div>
  );
}

export default MainLayout;
