import React, { useState } from 'react';
import FundVault from './VaultFundWithdraw/FundVault';
import DepositCrypto from './DepositCrypto';

function VaultFab() {
  const [fabOpen, setFabOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeposit, setisDeposit] = useState(true);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [depositMenuOpen, setDepositMenuOpen] = useState(false);
  return (
    <>
      {fabOpen ? (
        <>
          <div className="fabOverLay" onClick={() => setFabOpen(false)} />

          {depositMenuOpen ? (
            <div className="fabMenu">
              <div className="title">Deposit</div>
              <div
                className="menuItm"
                onClick={() => {
                  setOpenCrypto(true);
                  setFabOpen(false);
                }}
              >
                Crypto
              </div>
              <div
                className="menuItm"
                onClick={() => {
                  setOpenModal(true);
                  setisDeposit(true);
                  setFabOpen(false);
                }}
              >
                Vault
              </div>
              <div className="menuItm">Credit Card</div>
            </div>
          ) : (
            <div className="fabMenu">
              <div className="title">Actions</div>
              <div
                className="menuItm"
                onClick={() => {
                  setDepositMenuOpen(true);
                }}
              >
                Deposit
              </div>
              <div
                className="menuItm"
                onClick={() => {
                  setOpenModal(true);
                  setisDeposit(false);
                  setFabOpen(false);
                }}
              >
                Withdraw
              </div>
              <div className="menuItm">Transfer</div>
              <div className="menuItm">Exchange</div>
            </div>
          )}
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
      <DepositCrypto openModal={openCrypto} setOpenModal={setOpenCrypto} />
    </>
  );
}

export default VaultFab;
