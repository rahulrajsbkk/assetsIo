import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import LoanChartBar from './LoanChartBar';
import LoanChartArea from './LoanChartArea';

function LoansCard() {
  return (
    <div className="loans-card">
      <div className="loan-col-3">
        <div className="name">Loans Originated</div>
        <div className="volume">VOLUME</div>
        <div className="volume-amt">$786,067,850</div>
        <div className="chart">
          <LoanChartBar />
        </div>
        <div className="details">
          DETAILS&nbsp;
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </div>
      </div>
      <div className="loan-col-3">
        <div className="name">Outstanding Loans</div>
        <div className="volume">VOLUME</div>
        <div className="volume-amt">$786,067,850</div>
        <div className="chart">
          <LoanChartArea />
        </div>
        <div className="details">
          DETAILS&nbsp;
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </div>
      </div>
      <div className="loan-col-3">
        <div className="name">Supply / Collateral Added</div>
        <div className="volume">VOLUME</div>
        <div className="volume-amt">$786,067,850</div>
        <div className="chart">
          <LoanChartBar />
        </div>
        <div className="details">
          DETAILS&nbsp;
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </div>
      </div>
    </div>
  );
}

export default LoansCard;
