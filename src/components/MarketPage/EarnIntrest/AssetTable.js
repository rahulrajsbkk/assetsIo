import React from 'react';

function AssetTable({ coinList, setCoinToDetail }) {
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
            <td className="annRate">1.02%</td>
            <td className={`dayChange ${0 > coin._24hrchange}`}>
              {amtFormatter.format(coin._24hrchange)}%
            </td>
            <td className="supply">1,125,166.24 {coin.coinSymbol}</td>
            <td className="chart"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetTable;
