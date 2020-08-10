import React, { useState } from 'react';

function VaultFab() {
  const [fabOpen, setFabOpen] = useState(false);
  return (
    <>
      {fabOpen ? (
        <>
          <div className="fabOverLay" onClick={() => setFabOpen(false)} />
          <div className="fabMenu" onClick={() => setFabOpen(false)}>
            <div className="title">Actions</div>
            <div className="menuItm">Deposit</div>
            <div className="menuItm">Withdraw</div>
            <div className="menuItm">Transfer</div>
            <div className="menuItm">Exchange</div>
          </div>
        </>
      ) : (
        ''
      )}
      <div
        className={`fabBtn ${fabOpen}`}
        onClick={() => setFabOpen(!fabOpen)}
      ></div>
    </>
  );
}

export default VaultFab;
