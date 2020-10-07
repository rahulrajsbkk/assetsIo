/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Layout from '../Layout/Index';
import { BankContext } from '../context/Context';
import moneyMarkets from '../static/images/sidebar-icons/moneyMarkets.svg';
import paste from '../static/images/paste.svg';
import search from '../static/images/search.svg';
import Scrollbars from 'react-custom-scrollbars';
import LionBond from '../components/SVGComponents/LionBond';
import LoadingAnim from '../components/LoadingAnim/LoadingAnim';
import {
  FormatCurrency,
  FormatNumber,
  YesterdayToday,
} from '../utils/FunctionTools';
import TransactionInspector from '../components/TransactionInspector/TransactionInspector';

function BondOverview({ match }) {
  const [searchStr, setSearch] = useState('');
  const { tostShowOn, coinListObject, email } = useContext(BankContext);
  const [contractId, setContractId] = useState(
    (match && match.params && match.params.id) || ''
  );
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/contract/get?_id=${contractId}`
    )
      .then((res) => {
        const { data } = res;
        if (data.status)
          setContract(
            data.icedContracts &&
              data.icedContracts[0] &&
              data.icedContracts[0].contracts &&
              data.icedContracts[0].contracts[0]
          );
        else {
          tostShowOn(data.message || 'Something Went Wrong');
          history.push('/moneyMarkets');
        }
      })
      .finally(() => {
        setLoading(false);
      }); // eslint-disable-next-line
  }, [contractId]);

  console.log('contract', contract);

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
              Of {FormatNumber(contract && contract.feeRate, 2)}%. Therefore If
              You Are Earning $10.00 USD Today Your Broker Fee Would Be $
              {FormatNumber(10 * (contract && contract.feeRate), 2)} USD
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
                    contract && contract.redemptionFee,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(contract && contract.redemptionFeeUSD, 'USD')}
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
              {moment(contract && contract.start_timestamp).format(
                '[Date: ] MMMM Do YYYY [At] hh:mm A z'
              )}
            </div>
            <div className="item">
              <div className="label">Quantity</div>
              <div className="value">
                <div className="primary">
                  {contract && contract.num_of_bonds} Bond
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Cost Per Bond</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.contract_amount,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contract.contract_amount *
                      ((coinListObject &&
                        coinListObject[contract.coin] &&
                        coinListObject[contract.coin].price.USD) ||
                        1),
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Total Cost</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.investment,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  ${FormatCurrency(contract && contract.investment_usd, 'USD')}
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
              {moment(contract && contract.redemption_timestamp).format(
                '[Date: ] MMMM Do YYYY [At] hh:mm A z'
              )}
            </div>
            <div className="item">
              <div className="label">Redemption Value</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract &&
                      contract.redemptionFee + contract.redemptionAmount,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contract.redemptionFeeUSD + contract.redemptionAmountUSD,
                    'USD'
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Redemption Fee</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.redemptionFee,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(contract && contract.redemptionFeeUSD, 'USD')}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Gross Redemption Value</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.redemptionAmount,
                    contract && contract.coin
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contract && contract.redemptionAmountUSD,
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
            <div className="date">{`${contract.days} Payments`}</div>
            <div className="item">
              <div className="label">Daily Interest Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(contract && contract.interest_rate, 3)}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Daily Interest</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contract &&
                      (contract.investment * contract.interest_rate) / 100,
                    5
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contract &&
                      (contract.investment_usd * contract.interest_rate) / 100,
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
            <div className="date">{`${contract.days} Payments`}</div>
            <div className="item">
              <div className="label">Term Interest Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contract && contract.interest_rate * contract.days,
                    3
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Term Interest</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contract &&
                      (contract.investment *
                        contract.interest_rate *
                        contract.days) /
                        100,
                    5
                  )}{' '}
                  {contract && contract.coin}
                </div>
                <div className="secondary">
                  $
                  {FormatCurrency(
                    contract &&
                      (contract.investment_usd *
                        contract.interest_rate *
                        contract.days) /
                        100,
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
              {FormatNumber(contract && contract.interest_rate, 3)}%
            </div>
            <div className="item">
              <div className="label">Base Compression Rate</div>
              <div className="value">
                <div className="primary">
                  {FormatNumber(
                    contract && contract.interest_factors.base_compression_rate,
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
                    contract && contract.interest_factors.base_velocity,
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
                    contract && -contract.interest_factors.acceleration,
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
      case 7:
        return (
          <div className="listDetail">
            <div className="head">Net ROI</div>
            <div className="item">
              <div className="label">Total Investment</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.investment,
                    contract && contract.coin
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Term Earnings</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.initial_earning_power,
                    contract && contract.coin
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Issuance Fees</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract && contract.redemptionFee,
                    contract && contract.coin
                  )}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="label">Net Term Earnings</div>
              <div className="value">
                <div className="primary">
                  {FormatCurrency(
                    contract &&
                      contract.initial_earning_power - contract.redemptionFee,
                    contract && contract.coin
                  )}
                </div>
              </div>
            </div>
            <div className="item big">
              <div className="label">Net ROI</div>
              <div className="value">
                <div className="primary up">
                  {FormatNumber(
                    contract &&
                      (contract.initial_earning_power / contract.investment) *
                        100,
                    2
                  )}
                  %
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
  const [contractEarnings, setContractEarnings] = useState([]);
  const [contractEarningsOverView, setContractEarningsView] = useState({});
  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/interest/logs/get?email=shorupan@gmail.com&contract_id=${contractId}`
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setContractEarningsView({ ...data, interestLogs: undefined });
        setContractEarnings(data.interestLogs);
      }
    });
  }, [contractId]);

  const checkIsExpandValue = (num, coin) => {
    if (coin === 'BTC' || coin === 'ETH') {
      if (num && num < 0.0001) return true;
      else return false;
    } else {
      if (num && num < 0.01) return true;
      else return false;
    }
  };

  const [tiObject, setTiObject] = useState(false);
  let date = '';
  let coinSelected = coinListObject && coinListObject[contract.coin];
  return (
    <Layout active="moneyMarkets" className="bondOverview" hideFooter>
      {loading ? (
        <LoadingAnim />
      ) : (
        <>
          <div className="overView">
            <div className="searchWrapper">
              <img src={moneyMarkets} alt="" className="m-0" />
              <input
                type="text"
                value={searchStr}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Any Asset Hash..."
              />
              <img
                src={paste}
                alt=""
                onClick={() => {
                  navigator.clipboard
                    .readText()
                    .then((clipText) => setSearch(clipText));
                }}
              />
              <img
                src={search}
                alt=""
                onClick={() => {
                  setContractId(searchStr);
                }}
              />
            </div>
            <div className="bondTitle">
              {coinListObject &&
                coinListObject[contract.coin] &&
                coinListObject[contract.coin].coinName}{' '}
              Bond - {contractId}
            </div>
            <div className="bondValues">
              <div className="item">
                <div className="label">Payments Till Date</div>
                <div className="value">
                  {contractEarningsOverView &&
                    contractEarningsOverView.interest_payments}
                </div>
              </div>
              <div className="item">
                <div className="label">Total Paid Interest</div>
                <div className="value">
                  {FormatCurrency(
                    contractEarningsOverView &&
                      contractEarningsOverView.interest_paid,
                    contract && contract.coin
                  )}
                  {contract.coin} | $
                  {FormatCurrency(
                    contractEarningsOverView &&
                      contractEarningsOverView.interest_paid_usd
                  )}
                  USD
                </div>
              </div>
              <div className="item">
                <div className="label">Total Remaining Interest</div>
                <div className="value">
                  {FormatCurrency(
                    contractEarningsOverView &&
                      contractEarningsOverView.interest_remaining,
                    contract && contract.coin
                  )}
                  {contract.coin} | $
                  {FormatCurrency(
                    contractEarningsOverView &&
                      contractEarningsOverView.interest_remaining_usd
                  )}
                  USD
                </div>
              </div>
            </div>
            <Scrollbars
              autoHide
              className="earnings"
              renderView={(props) => <div {...props} className="vaultsView" />}
            >
              {contractEarnings.map((txn) => {
                console.log('txn', txn);
                function sameDay() {
                  if (moment(txn.timestamp).format('MMDDYYYY') === date) {
                  } else {
                    date = moment(txn.timestamp).format('MMDDYYYY');
                    return (
                      <div className="day">{YesterdayToday(txn.timestamp)}</div>
                    );
                  }
                }
                return (
                  <Fragment key={txn._id}>
                    {sameDay()}
                    <div className="vaults-itm">
                      <img
                        src={coinSelected && coinSelected.coinImage}
                        alt=""
                      />
                      <div className="name-n-date mr-auto">
                        <div className="name">{txn.pid || txn.reason}</div>
                        <div className="date">
                          {moment(txn.timestamp).format(
                            'MMMM Do YYYY [at] h:mm:ss A zz'
                          )}
                        </div>
                      </div>
                      <div
                        className={`credit ${checkIsExpandValue(
                          txn.earned_interest || 0,
                          txn.coin
                        )}`}
                      >
                        <span
                          className="expand"
                          onClick={() => {
                            setTiObject({
                              timestamp: txn.timestamp,
                              title: `${'Credit From Interest Payment'}`,
                              amount: txn.earned_interest,
                              coin: txn.coin,
                              current: txn.earned_usd_value,
                              updated: txn.earned_usd_value,
                            });
                          }}
                        >
                          Expand
                        </span>
                        <span className="value">
                          {FormatCurrency(txn.earned_interest, txn.coin)}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </Scrollbars>
          </div>
          <div className="bondCertificate">
            <LionBond
              text={`${
                coinListObject &&
                coinListObject[contract.coin] &&
                coinListObject[contract.coin].coinName &&
                coinListObject[contract.coin].coinName.toUpperCase()
              } BOND`}
            />
            <div className="header">
              <div className="label">Value Of Bond</div>
              <div className="value">
                ${FormatCurrency(contract && contract.investment_usd)}
              </div>
            </div>
            <Scrollbars
              autoHide
              className="bondDetailScroll"
              renderView={(props) => <div {...props} className="view" />}
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
            >
              {detailList()}
            </Scrollbars>
            <div className="footerButtons">
              <div className="btn-50">Asset Proof</div>
              <div className="btn-50">Share</div>
              <div
                className={`btn-100 ${
                  email && email === contract.email ? '' : 'disable'
                }`}
              >
                Trade
              </div>
            </div>
          </div>
        </>
      )}
      {tiObject ? (
        <TransactionInspector setOpenModal={setTiObject} tiObject={tiObject} />
      ) : (
        ''
      )}
    </Layout>
  );
}

export default BondOverview;
