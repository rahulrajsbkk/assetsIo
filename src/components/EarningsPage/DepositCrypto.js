/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import Lottie from 'react-lottie';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import * as animationData from '../../static/animations/cpu-loading.json';
import { VaultContext } from '../../context/VaultContext';

function DepositCrypto({ openModal, setOpenModal }) {
  const { coinAddress, coinSelected } = useContext(VaultContext);
  const onCopy = () => {
    // setWalletAddressCopy('Copied To Clipboard');
    // setTimeout(() => {
    //   setWalletAddressCopy(walletAddress);
    // }, 1000);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
  };

  return (
    <div className={`deposit-modal ${openModal ? '' : 'd-none'}`}>
      <div
        className="overlay-deposit"
        role="button"
        tabIndex="-1"
        onClick={() => setOpenModal(false)}
      />
      <div className="deposit-card-qr">
        <div className="title">Crypto</div>
        {coinAddress &&
        coinSelected &&
        coinSelected.coinSymbol &&
        coinAddress[coinSelected.coinSymbol] &&
        coinAddress[coinSelected.coinSymbol].address ? (
          <>
            <QRCode
              className="qr-svg"
              value={coinAddress[coinSelected.coinSymbol].address}
              renderAs="svg"
            />
            <CopyToClipboard
              text={coinAddress[coinSelected.coinSymbol].address}
              onCopy={onCopy}
            >
              <span className="wallet-addr">
                <input
                  type="text"
                  value={coinAddress[coinSelected.coinSymbol].address}
                  readOnly
                />
                <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
              </span>
            </CopyToClipboard>
          </>
        ) : (
          <div className="m-auto">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DepositCrypto;
