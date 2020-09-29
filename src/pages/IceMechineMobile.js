import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import Axios from 'axios';
import { PortfolioContext } from '../context/PortfolioContext';
import { BankContext } from '../context/Context';
import { FormatCurrency, FormatNumber } from '../utils/FunctionTools';
import { ReactComponent as GraphTriangle } from '../static/images/mobileGraph.svg';
import MobileLayout from '../Layout/MobileLayout';
import { useHistory } from 'react-router-dom';

function IceMechineMobile({ match }) {
  const history = useHistory();
  const [days, setDays] = useState(0);
  const [totalDays, setTotalDays] = useState(365);

  const {
    coinContract,
    setCoinContract,
    setIcingDays,
    createContractLoading,
    setCreateContractLoading,
  } = useContext(PortfolioContext);

  const {
    email,
    token,
    profileId,
    tostShowOn,
    getIcedContracts,
    conractsObj,
    validateToken,
  } = useContext(BankContext);

  const [contractDayStats, setContractDayStats] = useState([]);
  useEffect(() => {
    if (!coinContract) {
      if (match && match.params && match.params.coin) {
        setCoinContract(match.params.coin);
      } else {
        history.push('/bonds');
      }
    }
    // eslint-disable-next-line
  }, [coinContract]);
  useEffect(() => {
    if (totalDays && coinContract && conractsObj && conractsObj[coinContract])
      Axios.get(
        `https://comms.globalxchange.com/coin/iced/contract/interest/rate/stats?days=${totalDays}&coin=${coinContract}&contractValue=${conractsObj[coinContract].amount}`
      ).then((res) => {
        const { data } = res;
        if (data.status) {
          setContractDayStats(data.dayStats);
        }
      });
  }, [totalDays, coinContract, conractsObj]);

  const createContract = async () => {
    const isValidTkn = await validateToken(email, token);
    if (isValidTkn && !createContractLoading) {
      setCreateContractLoading(true);
      Axios.post('https://comms.globalxchange.com/coin/iced/contract/create', {
        email,
        token,
        coin: coinContract,
        num_of_bonds: 1,
        payCoin: coinContract,
        days: days,
        profile_id: profileId,
      })
        .then((res) => {
          const { data } = res;
          tostShowOn(data.message);
          if (data.status) {
            getIcedContracts();
            history.push('/index');
          }
        })
        .catch((err) => {
          tostShowOn(err.message || 'Something Went Wrong On Purchase');
        })
        .finally(() => {
          setCreateContractLoading(false);
        });
    }
  };

  return (
    <MobileLayout
      active="iceMecine"
      menuSelected="bonds-tab"
      className="iceMecineMobile"
    >
      <div className="timeDetail">
        <div className="head">
          <span className="days">{days} Days</span>
          {days ? (
            <span
              className="confirm"
              onClick={() => {
                setIcingDays(days);
                createContract();
              }}
            >
              Confirm
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="content">
          <div className="contentIn">
            <div className="value">
              {FormatNumber(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].interest,
                2
              )}
              %
            </div>
            <div className="label">Daily Rate</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatNumber(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].roiPercentage,
                2
              )}
              %
            </div>
            <div className="label">Total ROI</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatCurrency(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].dailyAmount,
                coinContract
              )}
            </div>
            <div className="label">Daily Earning ({coinContract})</div>
          </div>
          <div className="contentIn">
            <div className="value">
              {FormatCurrency(
                days &&
                  contractDayStats &&
                  contractDayStats[days - 1] &&
                  contractDayStats[days - 1].dailyAmount * days,
                coinContract
              )}
            </div>
            <div className="label">Total Earnings ({coinContract})</div>
          </div>
        </div>
      </div>
      <div className="chartNSlider">
        <GraphTriangle />
        <div className="days">
          <div className="today">
            Today’s Date: <span>{moment().format('MMMM Do YYYY')}</span>
          </div>
          {days ? (
            <div className="today">
              Selected Date{' '}
              <span>{moment().add('days', days).format('MMMM Do YYYY')}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <input
          value={days}
          type="range"
          min={0}
          max={totalDays}
          onChange={(e) => {
            setDays(e.target.value);
          }}
          className="range"
        />
        <div className="daysSwitcher">
          <div
            className={`option ${totalDays === 30}`}
            onClick={() => setTotalDays(30)}
          >
            1 Month
          </div>
          <div
            className={`option ${totalDays === 365}`}
            onClick={() => setTotalDays(365)}
          >
            1 Year
          </div>
          <div
            className={`option ${totalDays === 1825}`}
            onClick={() => setTotalDays(1825)}
          >
            5 Years
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

export default IceMechineMobile;
