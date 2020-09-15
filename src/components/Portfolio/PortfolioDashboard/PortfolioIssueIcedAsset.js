import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { PortfolioContext } from '../../../context/PortfolioContext';
import { BankContext } from '../../../context/Context';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import LoadingAnim from '../../LoadingAnim/LoadingAnim';

function PortfolioIssueIcedAsset() {
  const {
    icingDays,
    coinContract,
    contractCount,
    setContractCount,
    createContractLoading,
  } = useContext(PortfolioContext);
  const { email, token, profileId } = useContext(BankContext);
  const [contractResult, setContractResult] = useState({});
  useEffect(() => {
    Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
      email,
      token,
      coin: coinContract,
      days: icingDays,
      num_of_bonds: contractCount,
      payCoin: coinContract,
      simulate: true,
    }).then((res) => {
      const { data } = res;
      if (data.status) setContractResult(data);
    });
  }, [coinContract, email, icingDays, profileId, contractCount, token]);

  const [conractCostUsd, setConractCostUsd] = useState(false);
  const [depositCostUsd, setDepositCostUsd] = useState(false);
  const [dailyPaymentsUsd, setDailyPaymentsUsd] = useState(false);
  const [expirationUsd, setExpirationUsd] = useState(false);
  return (
    <div className="portfolioAssets issueIced">
      <div className="textNValuation">
        <div className="assetsText">
          <div className="title">Issue Iced Asset</div>
          <div className="detail">
            Now That You Have Established The Parameters For Your Bond, You Are
            Ready To Convert Your Liquid Asset Into Ice. Here Are The Final
            Configuarations Of Your Bond.
          </div>
          <div className="bondTypes">
            <div className="bondTypesText">How Many Bonds </div>
            <label className="drop-select p-0">
              <input
                type="text"
                value={contractCount}
                onChange={(e) => {
                  const numRegex = new RegExp(/^\d*$/);
                  if (numRegex.test(e.target.value) || e.target.value === '')
                    setContractCount(e.target.value);
                }}
                name=""
                id=""
              />
            </label>
          </div>
        </div>
        <div className="bondValuation">
          {conractCostUsd ? (
            <div className="value">
              {FormatCurrency(
                contractResult && contractResult.investment_usd,
                'USD'
              )}
              <small>USD</small>
            </div>
          ) : (
            <div className="value">
              {FormatCurrency(
                contractResult && contractResult.contractCost,
                coinContract
              )}
              <small>{coinContract}</small>
            </div>
          )}
          <div className="label">Bond Valuation Summary</div>
          <div className="switch">
            <div
              className={`btn ${!conractCostUsd}`}
              onClick={() => setConractCostUsd(false)}
            >
              {coinContract}
            </div>
            |
            <div
              className={`btn ${conractCostUsd}`}
              onClick={() => setConractCostUsd(true)}
            >
              USD
            </div>
          </div>
        </div>
      </div>
      <div className="depositDetails">
        <div className="detailBox">
          <div className="head">
            <div className="title">Deposit Details</div>
            <div className="switch">
              <div
                className={`btn ${!depositCostUsd}`}
                onClick={() => setDepositCostUsd(false)}
              >
                {coinContract}
              </div>
              |
              <div
                className={`btn ${depositCostUsd}`}
                onClick={() => setDepositCostUsd(true)}
              >
                USD
              </div>
            </div>
          </div>
          <div className="content">
            {depositCostUsd ? (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.investment_usd,
                  'USD'
                )}
                <small>USD</small>
              </div>
            ) : (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.investment,
                  coinContract
                )}
                <small>{coinContract}</small>
              </div>
            )}
            <div className="label">{moment().format('MMMM Do YYYY')}</div>
          </div>
        </div>
        <div className="detailBox">
          <div className="head">
            <div className="title">{icingDays} Daily Payments</div>
            <div className="switch">
              <div
                className={`btn ${!dailyPaymentsUsd}`}
                onClick={() => setDailyPaymentsUsd(false)}
              >
                {coinContract}
              </div>
              |
              <div
                className={`btn ${dailyPaymentsUsd}`}
                onClick={() => setDailyPaymentsUsd(true)}
              >
                USD
              </div>
            </div>
          </div>
          <div className="content">
            {dailyPaymentsUsd ? (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.interestValueUsd,
                  'USD'
                )}
                <small>USD</small>
              </div>
            ) : (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.interestValue,
                  coinContract
                )}
                <small>{coinContract}</small>
              </div>
            )}
            <div className="label">
              <b>
                {FormatNumber(contractResult && contractResult.interestRate, 4)}
                %{' '}
              </b>
              Of Total Bond
            </div>
          </div>
        </div>
        <div className="detailBox">
          <div className="head">
            <div className="title">Expiration Details</div>
            <div className="switch">
              <div
                className={`btn ${!expirationUsd}`}
                onClick={() => setExpirationUsd(false)}
              >
                {coinContract}
              </div>
              |
              <div
                className={`btn ${expirationUsd}`}
                onClick={() => setExpirationUsd(true)}
              >
                USD
              </div>
            </div>
          </div>
          <div className="content">
            {expirationUsd ? (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.redemptionAmountUSD,
                  'USD'
                )}
                <small>USD</small>
              </div>
            ) : (
              <div className="value">
                {FormatCurrency(
                  contractResult && contractResult.redemptionAmount,
                  coinContract
                )}
                <small>{coinContract}</small>
              </div>
            )}
            <div className="label">
              {moment().add('days', icingDays).format('MMMM Do YYYY')}
            </div>
          </div>
        </div>
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

export default PortfolioIssueIcedAsset;
