import React, { useContext, useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import CountUp from 'react-countup';
import settingsIcon from '../static/images/sidebar-icons/settings.svg';
import { BankContext } from '../context/Context';
import SidebarSettings from './SidebarSettings';

function AssetPriceOrRates({ isIndex }) {
  const {
    coinListObject,
    coinList,
    liquidRates,
    updateInterval,
    contentSideBar,
  } = useContext(BankContext);

  const arrow = (
    <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.89823 1.74397H7.05373L0.310669 8.46829L1.07484 9.23034L7.8179 2.50602V7.6472H8.8942V1.74397V0.670654H7.8179H1.89823V1.74397Z"
        fill="#3EA154"
      />
    </svg>
  );

  const [tabItem, setTabItem] = useState('Interest Rates');
  const [orderClass, setOrderClass] = useState('order-1');
  useEffect(() => {
    if (isIndex) {
      setTabItem('Asset Prices');
      setOrderClass('order-0');
    } else {
      setTabItem('Interest Rates');
      setOrderClass('order-1');
    }
  }, [isIndex]);

  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };

  function GetSortOrder() {
    if (coinListObject && coinListObject.BTC)
      return function (a, b) {
        if (coinListObject[a.coin].type > coinListObject[b.coin].type) {
          return 1;
        } else if (coinListObject[a.coin].type < coinListObject[b.coin].type) {
          return -1;
        }
        return 0;
      };
  }

  return (
    <>
      {tabItem === 'Settings' ? (
        <SidebarSettings
          defTab={contentSideBar && contentSideBar.head}
          tabItem={tabItem}
          setTabItem={setTabItem}
        />
      ) : (
        <div className="assetPriceWrapper">
          <div className="tab-inrest-asset">
            {contentSideBar && contentSideBar.head ? (
              contentSideBar.head
            ) : (
              <>
                <div
                  className={`tab-itm order-1 ${tabItem === 'Interest Rates'}`}
                  onClick={() => setTabItem('Interest Rates')}
                >
                  Liquid Rates
                </div>
                <div
                  className={`tab-itm ${
                    tabItem === 'Asset Prices'
                  } ${orderClass}`}
                  onClick={() => setTabItem('Asset Prices')}
                >
                  Asset Prices
                </div>
              </>
            )}
            <div
              className={`tab-itm settings order-3 ${tabItem === 'Settings'}`}
              onClick={() => setTabItem('Settings')}
            >
              <img src={settingsIcon} alt="" />
            </div>
          </div>
          <Scrollbars
            className="rate-list-wrapper"
            autoHide
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            renderView={(props) => <div {...props} className="rates-list" />}
          >
            {contentSideBar && contentSideBar.content ? (
              contentSideBar.content
            ) : coinListObject && tabItem === 'Interest Rates' ? (
              <>
                {Array.prototype.slice
                  .call(liquidRates)
                  .sort(GetSortOrder())
                  .map((rateCoin) => (
                    <div className="coin" key={rateCoin.coin}>
                      <img
                        className="coin-logo mr-2"
                        src={
                          coinListObject[rateCoin.coin] &&
                          coinListObject[rateCoin.coin].coinImage
                        }
                        alt=""
                      />
                      <div className="coin-name">
                        {coinListObject[rateCoin.coin] &&
                          coinListObject[rateCoin.coin].coinName}
                      </div>
                      <div className="rate">
                        <CountUp
                          onEnd={() => {
                            if (updateInterval)
                              setTimeout(() => {
                                togleDuration(duration);
                              }, updateInterval * 1000);
                          }}
                          duration={duration}
                          end={rateCoin.interest_rate * 365 || 0}
                          decimals={1}
                        />
                        %
                        <small>
                          (
                          <CountUp
                            duration={duration}
                            end={1.2 || 0}
                            decimals={1}
                          />
                          %)
                          {arrow}
                        </small>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <>
                {coinList.map((coin) => (
                  <div className="coin" key={coin.coinName}>
                    <img
                      className="coin-logo mr-2"
                      src={coin.coinImage}
                      alt=""
                    />
                    <div className="coin-name">{coin.coinName}</div>
                    <div className="rate">
                      <CountUp
                        onEnd={() => {
                          if (updateInterval)
                            setTimeout(() => {
                              togleDuration(duration);
                            }, updateInterval * 1000);
                        }}
                        duration={duration}
                        end={coin.price.USD || 0}
                        decimals={2}
                      />
                      <small className={`${coin._24hrchange < 0}`}>
                        (
                        <CountUp
                          duration={duration}
                          end={coin._24hrchange || 0}
                          decimals={1}
                        />
                        ){arrow}
                      </small>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Scrollbars>
        </div>
      )}
    </>
  );
}

export default AssetPriceOrRates;
