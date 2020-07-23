import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCreditCard,
  faSearch,
  faDownload,
  faEllipsisV,
  faTimes,
  faPencilAlt,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import BalanceChart from '../components/Transaction/BalanceChart';
import Layout from '../Layout/Index';

function Transaction({ match }) {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <Layout
      active={`transactions-${match.params.type}`}
      className="transaction"
    >
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
              </svg>
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
      {openSidebar && match.params.type !== undefined ? (
        <div className="side-bar-right d-flex flex-column">
          <FontAwesomeIcon
            className="close ml-auto"
            icon={faTimes}
            onClick={() => setOpenSidebar(false)}
          />
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
      ) : (
        ''
      )}
    </Layout>
  );
}

export default Transaction;
