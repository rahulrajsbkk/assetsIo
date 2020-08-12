import React, { useState } from 'react';
import FundVault from './VaultFundWithdraw/FundVault';

function VaultFab() {
  const [fabOpen, setFabOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeposit, setisDeposit] = useState(true);
  return (
    <>
      {fabOpen ? (
        <>
          <div className="fabOverLay" onClick={() => setFabOpen(false)} />
          <div className="fabMenu" onClick={() => setFabOpen(false)}>
            <div className="title">Actions</div>
            <div
              className="menuItm"
              onClick={() => {
                setOpenModal(true);
                setisDeposit(true);
              }}
            >
              Deposit
            </div>
            <div
              className="menuItm"
              onClick={() => {
                setOpenModal(true);
                setisDeposit(false);
              }}
            >
              Withdraw
            </div>
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
      <FundVault
        key={`${openModal}`}
        fundOrWithdraw={isDeposit ? 'Deposit' : 'Withdraw'}
        isDeposit={isDeposit}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default VaultFab;
