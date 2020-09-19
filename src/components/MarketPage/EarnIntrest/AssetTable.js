import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
import { BankContext } from '../../../context/Context';
import AssetAreaChart from './AssetAreaChart';

function AssetTable({ coinList, setCoinToDetail }) {
  const { updateInterval, liquidRatesObject } = useContext(BankContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };

  return (
    <table className="asetPlatformTable asset">
      <thead className="tableHead">
        <tr>
          <th className="col-a">Rank</th>
          <th className="col-b">Name</th>
          <th className="col-c">Daily Rate</th>
          <th className="col-d">7 Day Change</th>
          <th className="col-e">Supply</th>
          <th className="col-f">7 Day Chart</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {coinList.map((coin, i) => (
          <tr key={coin._id} onClick={() => setCoinToDetail(coin)}>
            <td className="rank col-a">{i + 1}</td>
            <td className="coin col-b">
              <div className="coin-name">
                <img src={coin.coinImage} alt="" className="coinLogo" />{' '}
                {coin.coinName}
              </div>
            </td>
            <td className="annRate col-c">
              <CountUp
                onEnd={() => {
                  if (updateInterval)
                    setTimeout(() => {
                      togleDuration(duration);
                    }, updateInterval * 1000);
                }}
                duration={duration}
                start={0}
                end={
                  (liquidRatesObject &&
                    liquidRatesObject[coin.coinSymbol] &&
                    liquidRatesObject[coin.coinSymbol].interest_rate) ||
                  0
                }
                decimals={4}
              />
              %
            </td>
            <td
              className={`dayChange col-d ${
                0 >
                (liquidRatesObject &&
                  liquidRatesObject[coin.coinSymbol] &&
                  liquidRatesObject[coin.coinSymbol].changeData &&
                  liquidRatesObject[coin.coinSymbol].changeData.interestRate &&
                  liquidRatesObject[coin.coinSymbol].changeData.interestRate
                    ._7days)
              }`}
            >
              <CountUp
                duration={duration}
                start={0}
                end={
                  (liquidRatesObject &&
                    liquidRatesObject[coin.coinSymbol] &&
                    liquidRatesObject[coin.coinSymbol].changeData &&
                    liquidRatesObject[coin.coinSymbol].changeData
                      .interestRate &&
                    liquidRatesObject[coin.coinSymbol].changeData.interestRate
                      ._7days) ||
                  0
                }
                decimals={2}
              />
              %
            </td>
            <td className="supply col-e">
              <CountUp
                duration={duration}
                start={
                  (liquidRatesObject &&
                    liquidRatesObject[coin.coinSymbol] &&
                    liquidRatesObject[coin.coinSymbol].supply - 2) ||
                  0
                }
                end={
                  (liquidRatesObject &&
                    liquidRatesObject[coin.coinSymbol] &&
                    liquidRatesObject[coin.coinSymbol].supply) ||
                  0
                }
                decimals={2}
              />{' '}
              {coin.coinSymbol}
            </td>
            <td className="chart col-f">
              <div className="chartIn">
                <AssetAreaChart
                  today={
                    (liquidRatesObject &&
                      liquidRatesObject[coin.coinSymbol] &&
                      liquidRatesObject[coin.coinSymbol].interest_rate) ||
                    0
                  }
                  sevenDay={
                    ((liquidRatesObject &&
                      liquidRatesObject[coin.coinSymbol] &&
                      liquidRatesObject[coin.coinSymbol].interest_rate) ||
                      0) -
                    ((liquidRatesObject &&
                      liquidRatesObject[coin.coinSymbol] &&
                      liquidRatesObject[coin.coinSymbol].changeData &&
                      liquidRatesObject[coin.coinSymbol].changeData
                        .interestRate &&
                      liquidRatesObject[coin.coinSymbol].changeData.interestRate
                        ._7days) ||
                      0)
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetTable;
