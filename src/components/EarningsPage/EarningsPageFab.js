import React, { useState, useEffect, Fragment, useContext } from 'react';
import EarningsWithdraw from './EarningsWithdraw/EarningsWithdraw';
import { EarningsContext } from '../../context/EarningsContext';

function EarningsPageFab() {
  const [fabOpen, setFabOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [depositMenuOpen, setDepositMenuOpen] = useState(false);
  const { appSelected, liquidOrBond } = useContext(EarningsContext);
  useEffect(() => {
    setDepositMenuOpen(false);
  }, [fabOpen]);
  return (
    <>
      {fabOpen ? (
        <Fragment key={`${fabOpen}`}>
          <div className="fabOverLay" onClick={() => setFabOpen(false)} />
          <div className="fabMenu">
            <div className="title">Actions</div>
            <div
              className="menuItm"
              onClick={() => {
                setOpenModal(true);
                setFabOpen(false);
              }}
            >
              Withdraw
            </div>
          </div>
        </Fragment>
      ) : (
        ''
      )}
      <EarningsWithdraw openModal={openModal} setOpenModal={setOpenModal} />
      {appSelected || liquidOrBond === 'Bond' ? (
        <div
          className={`fabBtn ${fabOpen}`}
          onClick={() => setFabOpen(!fabOpen)}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default EarningsPageFab;
