/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Layout from '../Layout/Index';
import { BankContext } from '../context/Context';
import moneyMarkets from '../static/images/sidebar-icons/moneyMarkets.svg';
import paste from '../static/images/paste.svg';
import search from '../static/images/search.svg';
import Scrollbars from 'react-custom-scrollbars';
import LionBond from '../components/SVGComponents/LionBond';
import Axios from 'axios';
import LoadingAnim from '../components/LoadingAnim/LoadingAnim';
import { FormatCurrency } from '../utils/FunctionTools';

function BondOverview({ match }) {
  const [searchStr, setSearch] = useState('');
  const { email, tostShowOn } = useContext(BankContext);
  const [contractId, setContractId] = useState(
    (match && match.params && match.params.id) || ''
  );
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `https://comms.globalxchange.com/coin/iced/contract/get?_id=${contractId}`
    )
      .then((res) => {
        const { data } = res;
        if (data.status)
          setContract(
            data.icedContracts &&
              data.icedContracts[0] &&
              data.icedContracts[0].contracts &&
              data.icedContracts[0].contracts[0]
          );
        else {
          tostShowOn(data.message || 'Something Went Wrong');
          history.push('/moneyMarkets');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contractId]);

  console.log('contract', contract);
  if (!email) {
    return <Redirect to="/" />;
  }
  return (
    <Layout active="moneyMarkets" className="bondOverview" hideFooter>
      {loading ? (
        <LoadingAnim />
      ) : (
        <>
          <div className="overView">
            <div className="searchWrapper">
              <img src={moneyMarkets} alt="" className="m-0" />
              <input
                type="text"
                value={searchStr}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Any Asset Hash..."
              />
              <img src={paste} alt="" />
              <img
                src={search}
                alt=""
                onClick={() => {
                  setContractId(searchStr);
                }}
              />
            </div>
            <div className="bondTitle">Bitcoin Bond - 23416167</div>
            <Scrollbars
              autoHide
              className="earnings"
              renderView={(props) => <div {...props} className="vaultsView" />}
            >
              <div className="day">September 5th 2020</div>
              <div className="vaults-itm">
                <img
                  src="https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/ethereumCoin.png"
                  alt
                />
                <div className="name-n-date mr-auto">
                  <div className="name">A ice Debit from Iced Contract</div>
                  <div className="date">September 5th 2020 at 4:04:17 AM </div>
                </div>
                <div className="credit false">
                  <span className="expand">Expand</span>
                  <span className="value">0.0000</span>
                </div>
              </div>
              <div className="day">August 24th 2020</div>
              <div className="vaults-itm">
                <img
                  src="https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/ethereumCoin.png"
                  alt
                />
                <div className="name-n-date mr-auto">
                  <div className="name">
                    A ice credit from Fund from GXVault
                  </div>
                  <div className="date">August 24th 2020 at 12:31:24 AM </div>
                </div>
                <div className="credit false">
                  <span className="expand">Expand</span>
                  <span className="value">0.0026</span>
                </div>
              </div>
              <div className="day">August 13th 2020</div>
              <div className="vaults-itm">
                <img
                  src="https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/ethereumCoin.png"
                  alt
                />
                <div className="name-n-date mr-auto">
                  <div className="name">
                    A ice Debit from Withdraw to GXVault
                  </div>
                  <div className="date">August 13th 2020 at 4:04:09 AM </div>
                </div>
                <div className="credit false">
                  <span className="expand">Expand</span>
                  <span className="value">0.0000</span>
                </div>
              </div>
              <div className="vaults-itm">
                <img
                  src="https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/ethereumCoin.png"
                  alt
                />
                <div className="name-n-date mr-auto">
                  <div className="name">A ice credit from Traded from BTC</div>
                  <div className="date">August 13th 2020 at 4:04:05 AM </div>
                </div>
                <div className="credit false">
                  <span className="expand">Expand</span>
                  <span className="value">1.0000</span>
                </div>
              </div>
              <div className="vaults-itm">
                <img
                  src="https://apimachine-s3.s3.us-east-2.amazonaws.com/coinImages/ethereumCoin.png"
                  alt
                />
                <div className="name-n-date mr-auto">
                  <div className="name">
                    A ice credit from Fund Iced From GX Vault
                  </div>
                  <div className="date">August 13th 2020 at 2:52:21 AM </div>
                </div>
                <div className="credit false">
                  <span className="expand">Expand</span>
                  <span className="value">1.0000</span>
                </div>
              </div>
            </Scrollbars>
          </div>
          <div className="bondCertificate">
            <LionBond text="BITCOIN BOND" />
            <div className="head">
              <div className="label">Value Of Bond</div>
              <div className="value">
                ${FormatCurrency(contract && contract.investment_usd)}
              </div>
            </div>
            <Scrollbars
              autoHide
              className="bondDetailScroll"
              renderView={(props) => <div {...props} className="view" />}
            >
              <div className="listItem">Issuance Details</div>
              <div className="listItem">Redemption Details</div>
              <div className="listItem">Earning Power</div>
              <div className="listItem">Interest Rate Mechanics</div>
              <div className="listItem">Daily Earning Power</div>
              <div className="listItem">Term Earning Power</div>
              <div className="listItem">Fees</div>
              <div className="listItem">Net ROI</div>
            </Scrollbars>
            <div className="footerButtons">
              <div className="btn-50">Asset Proof</div>
              <div className="btn-50">Share</div>
              <div className="btn-100">Trade</div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default BondOverview;
