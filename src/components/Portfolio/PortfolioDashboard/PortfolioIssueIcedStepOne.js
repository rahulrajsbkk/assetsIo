import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import PortfolioIssueIcedChecckoutCoin from './PortfolioIssueIcedChecckoutCoin';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import LionBond from '../../../components/SVGComponents/LionBond';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import LoadingAnim from '../../LoadingAnim/LoadingAnim';

function PortfolioIssueIcedStepOne() {
  const {
    coinContract,
    icingDays,
    contractCount,
    setContractCount,
    coinCheckOut,
    setCoinCheckOut,
    createContractLoading,
  } = useContext(PortfolioContext);
  const [contractResult, setContractResult] = useState({});
  const { conractsObj, coinListObject, email, token, profileId } = useContext(
    BankContext
  );

  const [stepIn, setStepIn] = useState(0);
  const [assetClass, setAssetClass] = useState('crypto');
  const [percent, setPercent] = useState('');
  const [contractRateUsd, setContractRateUsd] = useState(1);
  useEffect(() => {
    setContractRateUsd(
      (conractsObj[coinContract] &&
        conractsObj[coinContract].amount &&
        coinListObject &&
        coinListObject[coinContract] &&
        coinListObject[coinContract].price.USD &&
        coinListObject[coinContract].price.USD *
          conractsObj[coinContract].amount) ||
        1
    );
  }, [conractsObj, coinContract, coinListObject]);

  const onPercentChange = (e) => {
    if (!isNaN(e.target.value) && e.target.value <= 100) {
      setPercent(e.target.value);
      setContractCount(
        parseFloat(
          (
            ((coinCheckOut && coinCheckOut.coinValueUSD) *
              (e.target.value / 100)) /
            contractRateUsd
          ).toFixed(2)
        )
      );
    }
  };
  const onCountChange = (e) => {
    if (!isNaN(e.target.value)) {
      setContractCount(parseInt(e.target.value) || '');
      setPercent(
        parseFloat(
          (
            (e.target.value * contractRateUsd * 100) /
            (coinCheckOut && coinCheckOut.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
  };
  const roundSimulation = (firtTime) => {
    if (!Number.isInteger(contractCount)) {
      setContractCount(parseInt(contractCount));
      setPercent(
        parseFloat(
          (
            (parseInt(contractCount) * contractRateUsd * 100) /
            (coinCheckOut && coinCheckOut.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
    if (firtTime || percent > 100) {
      const cnt = parseInt(
        (coinCheckOut && coinCheckOut.coinValueUSD) / contractRateUsd
      );
      setContractCount(cnt);
      setPercent(
        parseFloat(
          (
            (parseInt(cnt) * contractRateUsd * 100) /
            (coinCheckOut && coinCheckOut.coinValueUSD)
          ).toFixed(2)
        )
      );
    }
  };

  useEffect(() => {
    if (
      coinCheckOut &&
      coinCheckOut.coinValueUSD &&
      contractRateUsd &&
      coinContract
    ) {
      roundSimulation(true);
    }
    // eslint-disable-next-line
  }, [coinCheckOut, contractRateUsd, coinContract]);

  useEffect(() => {
    Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
      email,
      token,
      coin: coinContract,
      days: icingDays,
      num_of_bonds: contractCount,
      payCoin: (coinCheckOut && coinCheckOut.coinSymbol) || coinContract,
      simulate: true,
    }).then((res) => {
      const { data } = res;
      if (data.status) setContractResult(data);
    });
  }, [
    coinContract,
    email,
    icingDays,
    profileId,
    contractCount,
    token,
    coinCheckOut,
  ]);

  const [listDetail, setListDetail] = useState(null);
  const [feesDetail, setFeesDetail] = useState(null);
  const feesItem = () => {
    switch (feesDetail) {
      case 1:
        return (
          <div className="listDetail sub">
            <div className="subHead">Broker Fees</div>
            <p>
              Broker Fees Are Deducted From You Gross Daily Earnings At A Rate
              Of {FormatNumber(contractResult && contractResult.feeRate, 2)}%.
              Therefore If You Are Earning $10.00 USD Today Your Broker Fee
              Would Be $
              {FormatNumber(10 * (contractResult && contractResult.feeRate), 2)}{' '}
              USD
            </p>
            <p className="nb">All Values In This Bond Is Post Broker Fees</p>
            <FontAwesomeIcon
              onClick={() => {
                setFeesDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 2:
        return (
          <div className="listDetail sub">
            <div className="subHead">Issuance Fee</div>
            <p>
              Issuance Fees Are Deducted From The Bond Upon Redemption. Daily
              Earning Power And Term Earning Power Calculations Are Pre-Issuance
              Fee While Net ROI Calculations Are Post Issuance Fees
            </p>
            <div className="item">
              <div className="label">Issuance Fee</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.redemptionFee,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult && contractResult.redemptionFeeUSD,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setFeesDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );

      default:
        return (
          <>
            <div className="listItem sub mt-2" onClick={() => setFeesDetail(1)}>
              Broker Fees
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem sub" onClick={() => setFeesDetail(2)}>
              Issuance Fee
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </>
        );
    }
  };

  const detailList = () => {
    switch (listDetail) {
      case 1:
        return (
          <div className="listDetail">
            <div className="head">Issuance Details</div>
            <div className="date">
              {moment(contractResult && contractResult.start_timestamp).format(
                '[Date: ] MMMM Do YYYY [At] hh:mm A z'
              )}
            </div>
            <div className="item">
              <div className="label">Quantity</div>
              <div className="value">
                <div className="primary">
                  {(contractResult && contractResult.num_of_bonds) ||
                    contractCount}{' '}
                  Bond
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Cost Per Bond</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.contractCost,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  ${FormatCurrency(contractRateUsd, 'USD')}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Total Cost</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.investment,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult && contractResult.investment_usd,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 2:
        return (
          <div className="listDetail">
            <div className="head">Redemption Details</div>
            <div className="date">
              {moment(
                contractResult && contractResult.redemption_timestamp
              ).format('[Date: ] MMMM Do YYYY [At] hh:mm A z')}
            </div>
            <div className="item">
              <div className="label">Gross Redemption Value</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.contractCost,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  ${FormatCurrency(contractRateUsd, 'USD')}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Redemption Fee</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.redemptionFee,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult && contractResult.redemptionFeeUSD,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Gross Redemption Value</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contractResult && contractResult.redemptionAmount,
                    contractResult && contractResult.coin
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult && contractResult.redemptionAmountUSD,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 3:
        return (
          <div className="listDetail">
            <div className="head">Daily Earning Power</div>
            <div className="date">{`${icingDays} Payments`}</div>
            <div className="item">
              <div className="label">Daily Interest Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contractResult && contractResult.interestRate,
                    3
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Cost Per Bond</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contractResult && contractResult.interestValue,
                    5
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult && contractResult.interestValueUsd,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 4:
        return (
          <div className="listDetail">
            <div className="head">Term Earning Power</div>
            <div className="date">{`${icingDays} Payments`}</div>
            <div className="item">
              <div className="label">Daily Interest Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contractResult && contractResult.interestRate * icingDays,
                    3
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Cost Per Bond</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contractResult && contractResult.interestValue * icingDays,
                    5
                  )}{' '}
                  {contractResult && contractResult.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contractResult &&
                      contractResult.interestValueUsd * icingDays,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 5:
        return (
          <div className="listDetail">
            <div className="head">Interest Rate Mechanics</div>
            <div className="date">
              Daily Rate =&nbsp;
              {FormatNumber(contractResult && contractResult.interestRate, 3)}%
            </div>
            <div className="item">
              <div className="label">Base Compression Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contractResult && contractResult.base_compression_rate,
                    3
                  )}
                  %
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Interest Rate Velocity</div>
              <div className="value">
                <div className="primary up">
                  {FormatNumber(
                    contractResult && contractResult.base_velocity,
                    2
                  )}
                  %
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Velocity Acceleration Factor</div>
              <div className="value">
                <div className="primary down">
                  {FormatNumber(
                    contractResult && -contractResult.acceleration,
                    2
                  )}
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      case 6:
        return (
          <div className="listDetail">
            <div className="head">Fees</div>
            <div className="date">2 Fee Structures</div>
            {feesItem()}
            <FontAwesomeIcon
              onClick={() => {
                setListDetail(null);
              }}
              className="close"
              icon={faCaretUp}
            />
          </div>
        );
      default:
        return (
          <>
            <div className="listItem" onClick={() => setListDetail(1)}>
              Issuance Details
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(2)}>
              Redemption Details
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(3)}>
              Daily Earning Power
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(4)}>
              Term Earning Power
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(5)}>
              Interest Rate Mechanics
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(6)}>
              Fees
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="listItem" onClick={() => setListDetail(7)}>
              Net ROI
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="issueIcedStepOne">
      <div className={`issueBond step-${stepIn}`}>
        <div className="head">Issue Your Bond</div>
        <p className="desc">
          Now That You Have Established The Parameters For Your Bond, You Are
          Ready To Convert Your Liquid Asset Into Ice. Here Are The Final
          Configuarations Of Your Bond.
        </p>
        <div className="btnLetsDoIt" onClick={() => setStepIn(1)}>
          Lets Do It
        </div>
        <div className="exactAmt">
          <span>Exact Amount</span>
          {percent > 100 || !Number.isInteger(contractCount) ? (
            <span onClick={() => roundSimulation()}>Round Simulation</span>
          ) : (
            ''
          )}
        </div>
        <div
          className={`boxContrtolls ${
            coinCheckOut && coinCheckOut.coinName ? '' : 'dis'
          }`}
        >
          <div className="coin">
            {(coinCheckOut && coinCheckOut.coinName) || assetClass}
          </div>
          <input
            value={percent}
            onChange={onPercentChange}
            type="text"
            placeholder="0.00%"
            readOnly={coinCheckOut && coinCheckOut.coinName ? false : true}
          />
          <input
            value={contractCount}
            onChange={onCountChange}
            type="text"
            placeholder="1 Bond"
            readOnly={coinCheckOut && coinCheckOut.coinName ? false : true}
          />
        </div>
        <Scrollbars
          className="headScroll"
          renderThumbHorizontal={() => <div />}
          renderThumbVertical={() => <div />}
          renderView={(props) => <div {...props} className="scrollList" />}
        >
          <div
            className={`assetClass ${assetClass === 'crypto'}`}
            onClick={() => setAssetClass('crypto')}
          >
            Crypto
          </div>
          <div
            className={`assetClass ${assetClass === 'fiat'}`}
            onClick={() => setAssetClass('fiat')}
          >
            Fiat
          </div>
          <div className="assetClass">Funds</div>
          <div className="assetClass">Loans</div>
          <div className="assetClass">Real Estate</div>
          <div className="assetClass">Private Equity</div>
          <div className="assetClass">Digital Properties</div>
          <div className="assetClass">Influence</div>
        </Scrollbars>
        <PortfolioIssueIcedChecckoutCoin
          setCoinObj={setCoinCheckOut}
          coinObj={coinCheckOut}
          assetClass={assetClass}
        />
      </div>
      <div className="bondOverview">
        <div className="days">{icingDays} Days</div>
        <LionBond
          text={`${
            coinListObject &&
            coinListObject[coinContract] &&
            coinListObject[coinContract].coinName &&
            coinListObject[coinContract].coinName.toUpperCase()
          } BOND`}
        />
        <div className="valuationHead">
          <span>Value Of Bond</span>
          <span>
            $
            {FormatCurrency(
              contractResult && contractResult.voc_usd,
              contractResult && contractResult.coin
            )}
          </span>
        </div>
        <Scrollbars
          className="valuationsScrl"
          renderThumbHorizontal={() => <div />}
          renderThumbVertical={() => <div />}
          renderView={(props) => <div {...props} className="valuationsView" />}
        >
          {detailList()}
        </Scrollbars>
      </div>
      {createContractLoading ? (
        <div className="issueIcedLoading">
          <LoadingAnim />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PortfolioIssueIcedStepOne;
