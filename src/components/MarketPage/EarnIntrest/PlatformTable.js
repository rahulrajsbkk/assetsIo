import React from 'react';

function PlatformTable({ coinSelect }) {
  const amtFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            {amtFormatter.format(coinSelect._24hrchange)}%
          </td>
          <td className="supply">Term Lock Up</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            {amtFormatter.format(coinSelect._24hrchange)}%
          </td>
          <td className="supply">Surety Deposit</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            {amtFormatter.format(coinSelect._24hrchange)}%
          </td>
          <td className="supply">Decentralized</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            {amtFormatter.format(coinSelect._24hrchange)}%
          </td>
          <td className="supply">None</td>
          <td className="chart"></td>
        </tr>
        <tr>
          <td className="rank">1</td>
          <td className="coin">
            <div className="coin-name">
              <img src={coinSelect.coinImage} alt="" className="coinLogo" />{' '}
              {coinSelect.coinName}
            </div>
          </td>
          <td className="annRate">1.02%</td>
          <td className={`dayChange ${0 > coinSelect._24hrchange}`}>
            {amtFormatter.format(coinSelect._24hrchange)}%
          </td>
          <td className="supply">Trading Volume</td>
          <td className="chart"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default PlatformTable;
