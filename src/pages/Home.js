import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faWallet,
  faExchangeAlt,
  faCreditCard,
  faSearch,
  faDownload,
  faEllipsisV,
  faTimes,
  faPencilAlt,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { BankContext } from '../context/Context';
import BalanceChart from '../components/Home/BalanceChart';

function Home() {
  const { email } = useContext(BankContext);
  if (email && email !== '') {
    return (
      <div className="d-flex home-page">
        <div className="side-bar d-flex flex-column">
          <div className="profile d-flex">
            <img
              src="https://optionsdocuments.blob.core.windows.net/documents/user-image-b939ba6b-c66d-4e15-8dd4-cc36cfdbd05e.png"
              alt=""
            />
            <div className="col py-3">
              <h5>
                John Fernandaz &nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </h5>
              <h6>Admin</h6>
            </div>
          </div>
          <div className="d-flex flex-column flex-grow-1 menu-side my-5 mx-3">
            <div className="menu-itm">
              <h5 className="d-flex py-3 menu-itm">
                <FontAwesomeIcon className="mr-4" icon={faWallet} />
                <span className="my-auto">Accounts</span>
              </h5>
            </div>
            <div className="menu-itm">
              <h5 className="d-flex py-3 menu-itm">
                <FontAwesomeIcon className="mr-4" icon={faCreditCard} />
                <span className="my-auto">Cards</span>
              </h5>
            </div>
            <div className="menu-itm">
              <h5 className="d-flex py-3 menu-itm">
                <FontAwesomeIcon className="mr-4" icon={faExchangeAlt} />
                <span className="my-auto">Payments</span>
              </h5>
            </div>
          </div>
          <div className="last-seen-card card p-4">
            <h6>Last Connection</h6>
            <h4>Tue,July 21st 20:48</h4>
          </div>
        </div>

        <div className="main-content d-flex flex-column p-5">
          <div className="balance d-flex flex-column">
            <h6 className="my-auto">Your Balance</h6>
            <div className="d-flex">
              <h2 className="mr-auto my-auto">$ 27,923,37</h2>
              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <span>
                <FontAwesomeIcon icon={faDownload} />
              </span>
              <span>
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </div>
          </div>
          <div className="d-flex drop-down-list mt-5 mb-4">
            <div className="drop-down">
              Status
              {'  '}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="drop-down">
              Type
              {'  '}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="drop-down">
              Statement
              {'  '}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="drop-down">
              Invoice
              {'  '}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className="drop-down">
              More
              {'  '}
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </div>
          <div className="transaction-table">
            <h6 className="py-3 px-2">Today</h6>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>{' '}
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
            <h6 className="py-3 px-2">Today</h6>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>{' '}
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
            <h6 className="py-3 px-2">Today</h6>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>{' '}
            <div className="trans-item d-flex mx-2 px-3 py-2">
              <div className="d-flex user-trans">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
                    fill="#FFEAE9"
                  />
                </svg>{' '}
                <div className="col">
                  <h5>Paypal</h5>
                  <h6>Various</h6>
                </div>
              </div>
              <div className="time my-auto">
                <h6>10:10</h6>
              </div>
              <div className="balance my-auto">
                <h6>32.56 $</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar-right d-flex flex-column">
          <FontAwesomeIcon className="close ml-auto" icon={faTimes} />
          <h2 className="mx-auto my-4">$ 10,923</h2>
          <h5 className="mx-auto mt-4 mb-2">Monoprix</h5>
          <h6 className="mx-auto my-1">Alimentary</h6>
          <div className="card payment-card px-2 py-1 mt-5 mx-auto">
            Payment By Card
          </div>
          <div className="chart d-flex flex-grow-1">
            <BalanceChart />
          </div>
          <div className="card mb-2 credit-card p-3 d-flex flex-row">
            <div className="d-flex card-icon">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="card-dtail mx-2">
              <h5>Credit Card</h5>
              <h6>XXX5904</h6>
            </div>
            <div className="remark my-auto ml-auto">Socite Genarale</div>
          </div>
          <div className="card notes p-3 mb-2">
            <h5 className="d-flex">
              Add Note
              <span>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </h5>
            <textarea
              placeholder="Type ypur text here"
              rows="5"
              className="note-area"
            />
          </div>
          <div className="card reciept p-3">
            <h5 className="d-flex mb-2">
              Add reciept
              <span>
                <FontAwesomeIcon icon={faPaperclip} />
              </span>
            </h5>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to="/login" />;
}

export default Home;
