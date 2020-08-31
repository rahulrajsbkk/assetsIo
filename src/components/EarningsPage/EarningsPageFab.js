import React, { useState, Fragment, useContext } from 'react';
import EarningsWithdraw from './EarningsWithdraw/EarningsWithdraw';
import { EarningsContext } from '../../context/EarningsContext';

function EarningsPageFab() {
  const [fabOpen, setFabOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { appSelected, liquidOrBond } = useContext(EarningsContext);
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
