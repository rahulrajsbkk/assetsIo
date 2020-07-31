import React from 'react';
import usdt from '../../../static/images/coin-color/tether.svg';

function AssetTable() {
  return (
    <table className="asetPlatformTable">
      <thead className="tableHead">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Annual Rate</th>
          <th>24Hr Change</th>
          <th>Supply</th>
          <th>Chart</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={usdt} alt="" className="coinLogo" /> Tether
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className="dayChange">0.12%</td>
          <td className="supply">1,125,166.24 USDT</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={usdt} alt="" className="coinLogo" /> Tether
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className="dayChange">0.12%</td>
          <td className="supply">1,125,166.24 USDT</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={usdt} alt="" className="coinLogo" /> Tether
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className="dayChange">0.12%</td>
          <td className="supply">1,125,166.24 USDT</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={usdt} alt="" className="coinLogo" /> Tether
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className="dayChange">0.12%</td>
          <td className="supply">1,125,166.24 USDT</td>
          <td className="chart"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default AssetTable;
