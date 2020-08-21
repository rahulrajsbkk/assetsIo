import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../../../context/Context';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import { IndexContext } from '../../../context/IndexContext';
import AssetTableChart from '../EarnIntrest/AssetTableChart';

function BondsListTable() {
  const { coinListObject } = useContext(BankContext);
  const { conractsObj } = useContext(IndexContext);
  const [days, setDays] = useState('');
  const [contract, setContract] = useState({});
  const [dailyOrTotal, setDailyOrTotal] = useState('Daily');
  return (
    <table className="asetPlatformTable">
      <thead className="tableHead">
        <tr>
          <th>Rank</th>
          <th>Asset</th>
          <th>Contract Cost</th>
          <th>Base Rate</th>
          <th>Acceleration</th>
          <th>Compression</th>
          <th className="text-left">Estimated Days</th>
        </tr>
      </thead>
      <tbody className="tableContent">
        {Object.entries(conractsObj).map(([key, value], i) => (
          <>
            <tr
              key={value._id}
              className={`${contract && contract._id === value._id}`}
            >
              <td className="rank">{i + 1}</td>
              <td className="coin">
                <div className="coin-name">
                  <img
                    src={coinListObject[key].coinImage}
                    alt=""
                    className="coinLogo"
                  />{' '}
                  {coinListObject[key].coinName}
                </div>
              </td>
              <td className="">
                {FormatCurrency(value.amount, key)} {key}
              </td>
              <td className="dayChange false">
                {FormatNumber(value.base_velocity, 2)}%
              </td>
              <td className="dayChange false">
                {FormatNumber(value.acceleration, 2)}%
              </td>
              <td className="dayChange true">
                {FormatNumber(value.base_compression_rate, 2)}
              </td>
              <td className="estimatedDays">
                <div className="estimatedDaysIn">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    defaultValue=""
                    onChange={(e) => setDays(e.target.value)}
                  />
                  <div className="btn-go" onClick={() => setContract(value)}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </div>
                </div>
              </td>
            </tr>
            {contract && contract._id === value._id ? (
              <tr className="detailRow">
                <td colSpan="7" className="p-0">
                  <div className="bondDetail">
                    <div className="btns">
                      <div
                        className={`btn-daily ${dailyOrTotal === 'Daily'}`}
                        onClick={() => setDailyOrTotal('Daily')}
                      >
                        Daily
                      </div>
                      <div
                        className={`btn-daily ${dailyOrTotal === 'Total'}`}
                        onClick={() => setDailyOrTotal('Total')}
                      >
                        Total
                      </div>
                    </div>
                    <div className="rateNPower">
                      <div className="value">0.12%</div>
                      <div className="label">{dailyOrTotal} Interest Rate</div>
                    </div>
                    <div className="rateNPower">
                      <div className="value">0.005</div>
                      <div className="label">{dailyOrTotal} Earning Power</div>
                    </div>
                    <div className="chartWrap">
                      <AssetTableChart />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              ''
            )}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default BondsListTable;
