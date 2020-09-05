import React, { useState, useContext, useEffect, Fragment } from 'react';
import FundVault from './VaultFundWithdraw/FundVault';
import DepositCrypto from './DepositCrypto';
import { VaultContext } from '../../context/VaultContext';

function VaultFab() {
  const { coinSelected } = useContext(VaultContext);
  const [fabOpen, setFabOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDeposit, setisDeposit] = useState(true);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [depositMenuOpen, setDepositMenuOpen] = useState(false);
  useEffect(() => {
    setDepositMenuOpen(false);
  }, [fabOpen]);
  return (
    <>
      {fabOpen ? (
        <Fragment key={`${fabOpen}`}>
          <div className="fabOverLay" onClick={() => setFabOpen(false)} />

          {depositMenuOpen ? (
            <div className="fabMenu">
              <div className="title">Deposit</div>
              {coinSelected.type === 'crypto' ? (
                <div
                  className="menuItm"
                  onClick={() => {
                    setOpenCrypto(true);
                    setFabOpen(false);
                  }}
                >
                  Crypto
                </div>
              ) : (
                ''
              )}
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
              <div className="menuItm disable">Transfer</div>
              <div className="menuItm disable">Exchange</div>
            </div>
          )}
        </Fragment>
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
