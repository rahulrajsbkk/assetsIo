import React from 'react';

function ModalAlertUpdate({ setOpenModal, assetClass }) {
  return (
    <div className="modalConfirm">
      <div
        className="overlayClose"
        onClick={() => {
          setOpenModal(false);
        }}
      />
      <div className="modalContent">
        <div className="head">
          <h5>Asset Class Update</h5>
        </div>
        <div className="contents">
          <div className="text">
            Issuing, Tracking, & Trading Of Investment {assetClass} Will Be
            Available Soon
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAlertUpdate;
