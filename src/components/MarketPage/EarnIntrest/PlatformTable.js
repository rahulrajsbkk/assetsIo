import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
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
    <table className="asetPlatformTable platform">
      <thead className="tableHead">
        <tr>
          <th className="col-a">Rank</th>
          <th className="col-b">Name</th>
          <th className="col-c">Annual Rate</th>
          <th className="col-d">Lend Rate</th>
          <th className="col-e">Borrow Rate</th>
          <th className="col-f">Supply</th>
          <th className="text-left col-g">Demand</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {Object.keys(platformRatesObject).map((key, i) => (
          <tr>
            <td className="rank col-a">{i + 1}</td>
            <td className="coin col-b">
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
                end={1.02 || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate col-d">
              <CountUp
                duration={duration}
                start={0}
                end={platformRatesObject[key].lend.rate || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate col-e">
              <CountUp
                duration={duration}
                start={0}
                end={platformRatesObject[key].borrow.rate || 0}
                decimals={2}
              />
              %
            </td>
            <td className="annRate col-f">
              <CountUp
                duration={duration}
                start={0}
                end={13400 || 0}
                decimals={2}
              />
            </td>
            <td className="annRate col-g">
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
