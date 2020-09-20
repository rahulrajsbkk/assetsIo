import React, { useContext, useState, useEffect, Fragment } from 'react';
import CountUp from 'react-countup';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../../../context/Context';
import { IndexContext } from '../../../context/IndexContext';
import LoginWrapper from '../../LoginModal/LoginWrapper';
import { useHistory } from 'react-router-dom';
import { PortfolioContext } from '../../../context/PortfolioContext';

function BondsListTable({ assetTab, setCoinToDetail }) {
  const history = useHistory();
  const {
    email,
    coinListObject,
    tostShowOn,
    convertCoin,
    defaultCoin,
    updateInterval,
  } = useContext(BankContext);
  const { conractsObj } = useContext(IndexContext);
  const { setCoinContract, setIcingStep, setIcingDays } = useContext(
    PortfolioContext
  );
  const [days, setDays] = useState('');
  const [contract, setContract] = useState({});
  const [contractPreview, setContractPreview] = useState({});

  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
  const [assetType, setAssetType] = useState('Fiat');
  useEffect(() => {
    switch (assetTab) {
      case 'stableCoin':
        setAssetType('Fiat');
        break;
      case 'cryptoCoin':
        setAssetType('Crypto');
        break;
      case 'fiat currencies':
        setAssetType('Iced');
        break;
      default:
        setAssetType('Iced');
        break;
    }
  }, [assetTab]);

  const calculateRoi = (key) => {
    Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
      coin: key,
      days: days,
      simulate: true,
    })
      .then((res) => {
        const { data } = res;
        if (data.status) {
          setContractPreview(data);
        } else {
          tostShowOn(data.message);
        }
      })
      .finally(() => {});
  };

  const getCoinDetail = (key) => {
    setCoinToDetail(coinListObject[key]);
  };

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <table className="asetPlatformTable bonds">
        <thead className="tableHead">
          <tr>
            <th>Rank</th>
            <th>Asset</th>
            <th>Contract Cost</th>
            <th>Base Rate</th>
            <th>Rate Velocity</th>
            <th>Acceleration</th>
            <th className="text-left">Estimated Days</th>
          </tr>
        </thead>
        <tbody className="tableContent">
          {Object.entries(conractsObj).map(([key, value], i) => {
            if (coinListObject[key].asset_type === assetType)
              return (
                <Fragment key={value._id}>
                  <tr className={`${contract && contract._id === value._id}`}>
                    <td className="rank">{i + 1}</td>
                    <td className="coin" onClick={() => getCoinDetail(key)}>
                      <div className="coin-name">
                        <img
                          src={coinListObject[key].coinImage}
                          alt=""
                          className="coinLogo"
                        />{' '}
                        {coinListObject[key].coinName}
                      </div>
                    </td>
                    <td className="" onClick={() => getCoinDetail(key)}>
                      <CountUp
                        onEnd={() => {
                          if (updateInterval)
                            setTimeout(() => {
                              togleDuration(duration);
                            }, updateInterval * 1000);
                        }}
                        duration={duration}
                        start={0}
                        end={convertCoin(value.amount, key) || 0}
                        decimals={
                          (defaultCoin.coin ? defaultCoin.coin : key) ===
                            'ETH' ||
                          (defaultCoin.coin ? defaultCoin.coin : key) === 'BTC'
                            ? 4
                            : 2
                        }
                      />{' '}
                      {defaultCoin.coin ? defaultCoin.coin : key}
                    </td>
                    <td
                      className="dayChange false"
                      onClick={() => getCoinDetail(key)}
                    >
                      <CountUp
                        duration={duration}
                        start={value.base_compression_rate - 2 || 0}
                        end={value.base_compression_rate || 0}
                        decimals={3}
                      />
                      %
                    </td>
                    <td
                      className="dayChange false"
                      onClick={() => getCoinDetail(key)}
                    >
                      <CountUp
                        duration={duration}
                        start={value.base_velocity - 2 || 0}
                        end={value.base_velocity || 0}
                        decimals={2}
                      />
                      %
                    </td>
                    <td
                      className="dayChange true"
                      onClick={() => getCoinDetail(key)}
                    >
                      <CountUp
                        duration={duration}
                        start={value.acceleration - 2 || 0}
                        end={-value.acceleration || 0}
                        decimals={2}
                      />
                    </td>
                    <td className="estimatedDays">
                      <div className="estimatedDaysIn">
                        <input
                          type="number"
                          placeholder="0"
                          step="1"
                          min="1"
                          defaultValue=""
                          onChange={(e) => setDays(e.target.value)}
                        />
                        <div
                          className="btn-go"
                          onClick={() => {
                            setContract(value);
                            calculateRoi(key);
                          }}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {contract && contract._id === value._id ? (
                    <tr className="detailRow">
                      <td colSpan="7" className="p-0">
                        <div className="bondDetail">
                          <div className="cardRow">
                            <div className="bondCard">
                              <div className="value">
                                0.12% <small>BTC</small>
                              </div>
                              <div className="label">Daily Interest Rate</div>
                            </div>
                            <div className="bondCard">
                              <div className="value">
                                0.12% <small>BTC</small>
                              </div>
                              <div className="label">Daily Earnings</div>
                            </div>
                            <div className="bondCard">
                              <div className="value">
                                0.12% <small>BTC</small>
                              </div>
                              <div className="label">Gross ROI</div>
                            </div>
                            <div className="bondCard">
                              <div className="value">
                                0.12% <small>BTC</small>
                              </div>
                              <div className="label">Gross Earnings</div>
                            </div>
                          </div>
                          <div className="controllsRow">
                            <div className="switchCurrency">
                              View Data In US Dollars
                            </div>
                            <div
                              className="btnSimulation"
                              onClick={() => setContract({})}
                            >
                              Close Simulation
                            </div>
                            <div
                              className="btnBond"
                              onClick={() => {
                                if (email) {
                                  setCoinContract(contract.coin);
                                  setIcingStep(1);
                                  setIcingDays(days);
                                  history.push('/iceAsset');
                                } else {
                                  setLoginModalOpen(true);
                                }
                              }}
                            >
                              Create Bond
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            return <Fragment key={value._id} />;
          })}
        </tbody>
      </table>
      {loginModalOpen ? (
        <LoginWrapper
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onLogin={() => {
            setCoinContract(contract.coin);
            setIcingStep(1);
            setIcingDays(days);
            history.push('/iceAsset');
            setLoginModalOpen(false);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default BondsListTable;
