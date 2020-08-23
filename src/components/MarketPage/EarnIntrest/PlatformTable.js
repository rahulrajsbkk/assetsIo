import React, { useState, useContext } from 'react';
import CountUp from 'react-countup';
import AssetTableChart from './AssetTableChart';
import { BankContext } from '../../../context/Context';

function PlatformTable({ coinSelect, setCoinToDetail }) {
  const { updateInterval } = useContext(BankContext);
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
          <th>24Hr Change</th>
          <th>Commitment</th>
          <th>Chart</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        <tr onClick={() => setCoinToDetail(coinSelect)}>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
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
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            <CountUp
              duration={duration}
              start={coinSelect._24hrchange - 2 || 0}
              end={coinSelect._24hrchange || 0}
              decimals={2}
            />
            %
          </td>
          <td className="supply">Term Lock Up</td>
          <td className="chart">
            <div className="chartIn">
              <AssetTableChart />
            </div>
          </td>
        </tr>
        <tr onClick={() => setCoinToDetail(coinSelect)}>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">
            <CountUp
              duration={duration}
              start={0}
              end={1.02 || 0}
              decimals={2}
            />
            %
          </td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            <CountUp
              duration={duration}
              start={coinSelect._24hrchange - 2 || 0}
              end={coinSelect._24hrchange || 0}
              decimals={2}
            />
            %
          </td>
          <td className="supply">Surety Deposit</td>
          <td className="chart">
            <div className="chartIn">
              <AssetTableChart />
            </div>
          </td>
        </tr>
        <tr onClick={() => setCoinToDetail(coinSelect)}>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">
            <CountUp
              duration={duration}
              start={0}
              end={1.02 || 0}
              decimals={2}
            />
            %
          </td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            <CountUp
              duration={duration}
              start={coinSelect._24hrchange - 2 || 0}
              end={coinSelect._24hrchange || 0}
              decimals={2}
            />
            %
          </td>
          <td className="supply">Decentralized</td>
          <td className="chart">
            <div className="chartIn">
              <AssetTableChart />
            </div>
          </td>
        </tr>
        <tr onClick={() => setCoinToDetail(coinSelect)}>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">
            <CountUp
              duration={duration}
              start={0}
              end={1.02 || 0}
              decimals={2}
            />
            %
          </td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            <CountUp
              duration={duration}
              start={coinSelect._24hrchange - 2 || 0}
              end={coinSelect._24hrchange || 0}
              decimals={2}
            />
            %
          </td>
          <td className="supply">None</td>
          <td className="chart">
            <div className="chartIn">
              <AssetTableChart />
            </div>
          </td>
        </tr>
        <tr onClick={() => setCoinToDetail(coinSelect)}>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">
            <CountUp
              duration={duration}
              start={0}
              end={1.02 || 0}
              decimals={2}
            />
            %
          </td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            <CountUp
              duration={duration}
              start={coinSelect._24hrchange - 2 || 0}
              end={coinSelect._24hrchange || 0}
              decimals={2}
            />
            %
          </td>
          <td className="supply">Trading Volume</td>
          <td className="chart">
            <div className="chartIn">
              <AssetTableChart />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PlatformTable;
