import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
import AssetTableChart from './AssetTableChart';
import { BankContext } from '../../../context/Context';

function AssetTable({ coinList, setCoinToDetail }) {
  const { updateInterval, liquidRatesObject } = useContext(BankContext);
  const [duration, setDuration] = useState(2);
  const togleDuration = (duration) => {
    setDuration(duration === 2 ? 2.1 : 2);
  };
  return (
    <table className="asetPlatformTable">
      <thead className="tableHead">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Daily Rate</th>
          <th>24Hr Change</th>
          <th>Supply</th>
          <th>Chart</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {coinList.map((coin, i) => (
          <tr key={coin._id} onClick={() => setCoinToDetail(coin)}>
            <td className="rank">{i + 1}</td>
            <td className="coin">
              <div className="coin-name">
                <img src={coin.coinImage} alt="" className="coinLogo" />{' '}
                {coin.coinName}
              </div>
            </td>
            <td className="annRate">
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
            <td className={`dayChange ${0 > coin._24hrchange}`}>
              <CountUp
                duration={duration}
                start={coin._24hrchange - 2 || 0}
                end={coin._24hrchange || 0}
                decimals={2}
              />
              %
            </td>
            <td className="supply">
              <CountUp
                duration={duration}
                start={1125166.24 - 2 || 0}
                end={1125166.24 || 0}
                decimals={2}
              />{' '}
              {coin.coinSymbol}
            </td>
            <td className="chart">
              <div className="chartIn">
                <AssetTableChart />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetTable;
