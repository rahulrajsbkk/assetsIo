import React, { useContext, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import CountUp from 'react-countup';
import { BankContext } from '../../../context/Context';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { useHistory } from 'react-router-dom';

function BondsListTableMobile({ assetTab }) {
  const history = useHistory();
  const { conractsObj, coinListObject, updateInterval } = useContext(
    BankContext
  );
  const { setCoinContract } = useContext(PortfolioContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
  return (
    <div className="bondListTableMobile">
      <div className="head">
        <span>Coin</span>
        <span>Bond Unit Cost</span>
      </div>
      <Scrollbars
        className="bondsListWrapper"
        renderView={(props) => <div {...props} className="bondsList" />}
      >
        {Object.keys(conractsObj)
          .filter((key) => {
            if (coinListObject && coinListObject[key])
              switch (assetTab) {
                case 'cryptoCoin':
                  return coinListObject[key].type === 'crypto';
                case 'stableCoin':
                  return (
                    coinListObject[key].type === 'crypto' &&
                    coinListObject[key].stable_coin
                  );
                case 'fiat currencies':
                  return coinListObject[key].type === 'fiat';
                default:
                  return true;
              }
            return true;
          })
          .map((key) => {
            const contract = conractsObj[key];
            return (
              <div
                className="bondsItem"
                key={key}
                onClick={() => {
                  setCoinContract(key);
                  history.push(`/iceAssetMobile/${key}`);
                }}
              >
                <div className="coinPrice">
                  <div className="img">
                    <img
                      src={
                        coinListObject &&
                        coinListObject[key] &&
                        coinListObject[key].coinImage
                      }
                      alt=""
                    />
                    {coinListObject &&
                      coinListObject[key] &&
                      coinListObject[key].coinName}
                  </div>
                  <div className="title">
                    <CountUp
                      onEnd={() => {
                        if (updateInterval)
                          setTimeout(() => {
                            togleDuration(duration);
                          }, updateInterval * 1000);
                      }}
                      duration={duration}
                      start={0}
                      end={contract.amount || 0}
                      decimals={
                        contract.coin === 'ETH' || contract.coin === 'BTC'
                          ? 4
                          : 2
                      }
                    />
                    {contract.coin}
                  </div>
                </div>
                <div className="rates">
                  <div className="ratesItem text-left">
                    <div className="value">
                      <CountUp
                        duration={duration}
                        start={0}
                        end={contract.base_compression_rate || 0}
                        decimals={3}
                      />
                      %
                    </div>
                    <div className="label">Base Rate</div>
                  </div>
                  <div className="ratesItem text-center">
                    <div className="value">
                      <CountUp
                        duration={duration}
                        start={0}
                        end={contract.base_velocity || 0}
                        decimals={1}
                      />
                      %
                    </div>
                    <div className="label">Velocity</div>
                  </div>
                  <div className="ratesItem text-right">
                    <div className="value">
                      <CountUp
                        duration={duration}
                        start={0}
                        end={-contract.acceleration || 0}
                        decimals={2}
                      />
                    </div>
                    <div className="label">Acceleration</div>
                  </div>
                </div>
              </div>
            );
          })}
      </Scrollbars>
    </div>
  );
}

export default BondsListTableMobile;
