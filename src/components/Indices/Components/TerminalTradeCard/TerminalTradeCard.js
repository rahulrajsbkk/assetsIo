import React, { useState } from 'react';
import TerminalTabView from './TerminalTabView';
import RecentTradesTabView from './RecentTradesTabView';

function TerminalTradeCard() {
  const [tab, setTab] = useState('Options');
  return (
    <div className="card card-terminal-trades card-dark flex-grow-1 h-100 d-flex flex-column">
      <div className="opt-tab d-flex">
        <div
          className={'tab-itm w-50 p-3 ' + (tab === 'Mortgage' ? 'active' : '')}
          onClick={() => setTab('Mortgage')}
        >
          Mortgage
        </div>
        <div
          className={'tab-itm w-50 p-3 ' + (tab === 'Options' ? 'active' : '')}
          onClick={() => setTab('Options')}
        >
          Options
        </div>
      </div>
      {tab === 'Mortgage' ? <></> : <TerminalTabView />}
    </div>
  );
}

export default TerminalTradeCard;
