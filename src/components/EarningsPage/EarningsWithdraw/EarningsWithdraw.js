/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React from 'react';
import SetAmount from './Fund/SetAmount/SetAmount';

function EarningsWithdraw({ openModal, setOpenModal }) {
  return (
    <div className={`deposit-modal ${openModal ? '' : 'd-none'}`}>
      <div
        className="overlay-deposit"
        role="button"
        tabIndex="-1"
        onClick={() => setOpenModal(false)}
      />
      <div className="deposit-card">
        <div className="title">Withdraw</div>
        <SetAmount setOpenModal={setOpenModal} />
      </div>
    </div>
  );
}

export default EarningsWithdraw;
