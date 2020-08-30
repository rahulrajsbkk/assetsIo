/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import Lottie from 'react-lottie';
import Axios from 'axios';
import SetAmount from './Fund/SetAmount/SetAmount';
import * as animationData from '../../../static/animations/cpu-loading.json';
import { BankContext } from '../../../context/Context';

function EarningsWithdraw({ openModal, setOpenModal }) {
  const { email, coinListObject, coinList } = useContext(BankContext);

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
