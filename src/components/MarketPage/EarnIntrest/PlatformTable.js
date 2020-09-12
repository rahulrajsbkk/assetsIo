import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
import AssetTableChart from './AssetTableChart';
import { BankContext } from '../../../context/Context';
import { IndexContext } from '../../../context/IndexContext';
import all from '../../../static/images/allPlatforms.svg';

function PlatformTable() {
  const { updateInterval, coinListObject } = useContext(BankContext);
  const { platformRatesObject, coinSelect } = useContext(IndexContext);
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
          <th>Annual Rate</th>
          <th>Lend Rate</th>
          <th>Borrow Rate</th>
          <th>Supply</th>
          <th className="text-left">Demand</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {Object.keys(platformRatesObject).map((key, i) => (
          <tr>
            <td className="rank">{i + 1}</td>
            <td className="coin">
              <div className="coin-name">
                <img
                  src={
                    (coinListObject &&
                      coinListObject[coinSelect] &&
                      coinListObject[coinSelect].coinImage) ||
                    all
                  }
                  alt=""
                  className="coinLogo"
                />{' '}
                {key}
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
                end={1.02 || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate">
              <CountUp
                duration={duration}
                start={0}
                end={platformRatesObject[key].lend.rate || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate">
              <CountUp
                duration={duration}
                start={0}
                end={platformRatesObject[key].borrow.rate || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate">
              <CountUp
                duration={duration}
                start={0}
                end={13400 || 0}
                decimals={2}
              />
            </td>
            <td className="annRate">
              <CountUp
                duration={duration}
                start={0}
                end={12000 || 0}
                decimals={2}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlatformTable;
