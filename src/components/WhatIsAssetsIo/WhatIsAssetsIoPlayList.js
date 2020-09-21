import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
function WhatIsAssetsIoPlayList({ setOpen }) {
  const [openAccordin, setOpenAccordin] = useState(true);
  return (
    <div className="playList">
      <div className="title">I’m New To This Playlist</div>
      <div className="goBack" onClick={() => setOpen(false)}>
        What Is Assets.io
      </div>
      <div className="mainList">
        <div className={`ListAccordin ${openAccordin}`}>
          <div className="head" onClick={() => setOpenAccordin(!openAccordin)}>
            <span>The Mission</span>
            <FontAwesomeIcon
              className="icon"
              icon={openAccordin ? faCaretUp : faCaretDown}
            />
          </div>
          <div className="analyticsEarn">
            <div
              className="menu true"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                className="view"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflow: 'scroll',
                }}
              >
                <div className="menu-itm true">Liquid Rate</div>
                <div className="menu-itm false">Bonds</div>
                <div className="menu-itm false">Base Rate</div>
                <div className="menu-itm false">Interest Velocity</div>
                <div className="menu-itm false">Inverse Acceleration </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  height: 6,
                  transition: 'opacity 200ms ease 0s',
                  opacity: 0,
                  right: 2,
                  bottom: 2,
                  left: 2,
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'block',
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: 'inherit',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    width: 388,
                    transform: 'translateX(0px)',
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  width: 6,
                  transition: 'opacity 200ms ease 0s',
                  opacity: 0,
                  right: 2,
                  bottom: 2,
                  top: 2,
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: 'inherit',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    height: 171,
                    transform: 'translateY(0px)',
                  }}
                />
              </div>
            </div>
            <div className="content">
              <div className="textContent">
                <h6>What Is A "Liquid Rate"?</h6>
                <div className="textDetail">
                  A Liquid Rate (LR) represents the time value of an asset
                  traded on Assets.io. LR's are always denominated as a daily
                  function in the asset of its principle.
                </div>
              </div>
              <div className="palyerWrapper">
                <svg
                  width="39"
                  height="43"
                  viewBox="0 0 39 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.895 19.6252L3.22833 0.275282C2.55667 -0.0988174 1.73767 -0.0902174 1.07467 0.292482C0.407333 0.679481 0 1.38468 0 2.15008V40.85C0 41.6154 0.407333 42.3206 1.07467 42.7076C1.41267 42.9011 1.78967 43 2.16667 43C2.53067 43 2.899 42.9097 3.22833 42.7248L37.895 23.3748C38.5753 22.9921 39 22.2783 39 21.5C39 20.7217 38.5753 20.0079 37.895 19.6252Z"
                    fill="#464B4E"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="ListAccordin">
          <div className="head">
            <span>Crashcourse On Traditional Asset Classes</span>
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
          </div>
        </div>
        <div className="ListAccordin">
          <div className="head">
            <span>The Evolution Of Crypto Assets</span>
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
          </div>
        </div>
        <div className="ListAccordin">
          <div className="head">
            <span>Understanding MoneyMarkets.io Protocol</span>
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
          </div>
        </div>
        <div className="ListAccordin">
          <div className="head">
            <span>Understanding Ice Protocol & The Bond Market</span>
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
          </div>
        </div>
        <div className="ListAccordin">
          <div className="head">
            <span>What Is Wealth Transition</span>
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatIsAssetsIoPlayList;
