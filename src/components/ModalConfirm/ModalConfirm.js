import React from 'react';

import logo from '../../static/images/logo.svg';

function ModalConfirm({ onClose, onConfirm, text, setOpenModal }) {
  return (
    <div className="modalConfirm">
      <div
        className="overlayClose"
        onClick={() => {
          try {
            onClose();
          } catch (error) {}
          setOpenModal(false);
        }}
      />
      <div className="modalContent">
        <div className="head">
          <img src={logo} alt="" />
          <h5>IcedVault</h5>
        </div>
        <div className="contents">
          <div className="text">{text}</div>
          <div className="buttons">
            <div
              className="btn-confirm"
              onClick={() => {
                try {
                  onConfirm();
                } catch (error) {}
                setOpenModal(false);
              }}
            >
              Confirm
            </div>
            <div
              className="btn-cancel"
              onClick={() => {
                try {
                  onClose();
                } catch (error) {}
                setOpenModal(false);
              }}
            >
              Never Mind
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
