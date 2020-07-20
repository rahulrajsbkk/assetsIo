/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import bitcoin from '../../static/images/vault-methods/bitcoin.svg';
import vault from '../../static/images/vault-methods/vault.svg';
import FundVault from './VaultFundWithdraw/FundVault';

function VaultFundWithdraw() {
  const [tab, setTab] = useState('Fund');
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="vault-fund-withdraw p-3">
        <div className="card h-100 accounts">
          <div className="d-flex tab">
            <div
              role="button"
              tabIndex="0"
              onClick={() => {
                setTab('Fund');
              }}
              className={`col-6 tab-itm ${tab === 'Fund' ? 'active' : ''}`}
            >
              <h5>Fund</h5>
            </div>
            <div
              role="button"
              tabIndex="0"
              onClick={() => {
                setTab('Withdraw');
              }}
              className={`col-6 tab-itm ${tab === 'Withdraw' ? 'active' : ''}`}
            >
              <h5>Withdraw</h5>
            </div>
          </div>
          <div className="account-list">
            <div
              className="account-itm"
              style={{ opacity: 1, cursor: 'pointer' }}
            >
              <img src={bitcoin} alt="" />
            </div>
            <div
              className="account-itm"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex="0"
              onClick={() => setOpenModal(true)}
            >
              <img src={vault} alt="" />
            </div>
          </div>
        </div>
      </div>
      <FundVault
        key={openModal}
        fundOrWithdraw={tab}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default VaultFundWithdraw;
