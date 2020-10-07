import React, { useContext, useState, useEffect } from 'react';
import Progress from 'antd/lib/progress/index';
import moment from 'moment';
import Countdown from 'react-countdown';
import { OptionsContext } from '../../../ContextAPI/OptionContext';

function LiveTrdesItem({ data }) {
  const {
    balanceToggle,
    usdAmountFormatter,
    cryptoTimeRate,
    transactions,
  } = useContext(OptionsContext);
  const [secondsRemaining, setSecondsRemaining] = useState(1);
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setSecondsRemaining(0);
      return <h2 className="mt-3 mb-1">00:00:00:00</h2>;
    } else {
      setSecondsRemaining(days * 86400 + hours * 3600 + minutes * 60 + seconds);
      let dd = days < 10 ? '0' + days : days;
      let hr = hours < 10 ? '0' + hours : hours;
      let min = minutes < 10 ? '0' + minutes : minutes;
      let sec = seconds < 10 ? '0' + seconds : seconds;
      return (
        <h2 className="mt-3 mb-1">
          {dd}:{hr}:{min}:{sec}
        </h2>
      );
    }
  };
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('green');
  useEffect(() => {
    if (secondsRemaining === 0) setTimeout(balanceToggle(), 1000);
    if (secondsRemaining > 0) {
      setColor(
        data.RequestType === 'Upper' &&
          data.Market > cryptoTimeRate.value &&
          data.RequestType !== 'Upper' &&
          data.Market < cryptoTimeRate.value
          ? 'red'
          : 'green'
      );
    }
  }, [secondsRemaining]);
  const [isWin, setIsWin] = useState(false);
  useEffect(() => {
    if (data.isEnabled === true) {
      setLoading(false);
      setIsWin(data.winPercentage !== '0');
    }
    if (loading) balanceToggle();
  }, [data]);

  return (
    <div className="card live-trades-item m-1">
      {secondsRemaining === 0 ? (
        loading ? (
          <div class="lds-default m-auto">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : isWin ? (
          <h2 className="m-auto text-center text-success">Trade Won</h2>
        ) : (
          <h2 className="m-auto text-center text-danger">Trade Lost</h2>
        )
      ) : (
        <>
          <Countdown
            date={new Date(`${data.Time} UTC`)}
            daysInHours={true}
            renderer={renderer}
          />
          <div className="d-flex justify-content-between px-4">
            <p className="text-success m-0">
              <span className="fas fa-long-arrow-alt-down mx-1"></span>
              80.00%
            </p>
            <p className="text-danger m-0">
              <span className="fas fa-long-arrow-alt-down mx-1"></span>
              21.43%
            </p>
          </div>

          <Progress
            className="px-4"
            percent={
              isNaN(
                secondsRemaining /
                  ((new Date(data.Time).getTime() -
                    new Date(data.TranscationStartTime).getTime()) /
                    1000)
              )
                ? 100
                : 100 -
                  parseInt(
                    (secondsRemaining /
                      ((new Date(data.Time).getTime() -
                        new Date(data.TranscationStartTime).getTime()) /
                        1000)) *
                      100
                  )
            }
            status="active"
            showInfo={false}
            strokeLinecap="square"
            strokeColor={color}
            strokeWidth={6}
          />
          <div className="d-flex text-white fund-list-item px-4">
            <div className="col-3 px-1 d-flex">
              <div className="d-flex flex-column text-left">
                <h6 className="m-0">
                  {moment(data.Time).format('YYYY-MM-DD')}
                </h6>{' '}
                <p className="m-0">{moment(data.Time).format('HH:mm ')}</p>
              </div>
            </div>
            <div className="col-3 px-1 my-auto">
              {data.RequestType === 'Upper' ? (
                <i className="fas fa-long-arrow-alt-up text-success mx-1" />
              ) : (
                <i className="fas fa-long-arrow-alt-down text-danger mx-1" />
              )}
              {data.Asset === 'BTC' ? 'Bitcoin' : 'Ethereum'}
            </div>
            <div className="col-3 px-1 my-auto">
              ${usdAmountFormatter.format(data.Market)}
            </div>
            <div className="col-3 px-1 text-success my-auto text-right">
              ${usdAmountFormatter.format(cryptoTimeRate.value)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveTrdesItem;
