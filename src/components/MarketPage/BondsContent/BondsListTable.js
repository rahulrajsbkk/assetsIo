import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BankContext } from '../../../context/Context';
import { FormatCurrency, FormatNumber } from '../../../utils/FunctionTools';
import { IndexContext } from '../../../context/IndexContext';

function BondsListTable() {
  const { coinListObject } = useContext(BankContext);
  const { conractsObj } = useContext(IndexContext);

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
          <tr key={value._id}>
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
            <td className="">{FormatCurrency(value.amount, key)}</td>
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
                <input type="number" step="1" min="1" />
                <div className="btn-go">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BondsListTable;
