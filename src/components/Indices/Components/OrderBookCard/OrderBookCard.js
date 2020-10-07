import React, { useState, useEffect, useContext } from 'react';
import OrderListItem from './OrderListItem';
import { OptionsContext } from '../../ContextAPI/OptionContext';

let ws;
function OrderBookCard() {
  const { coin, cryptoTimeRate, usdAmountFormatter } = useContext(
    OptionsContext
  );
  const [wsOpen, setWsOpen] = useState(false);
  const [unSubscribe, setUnSubscribe] = useState({
    method: 'UNSUBSCRIBE',
    params: [`${coin.toLowerCase()}usdt@depth5@1000ms`],
    id: 1,
  });
  const [wsResp, setWsResp] = useState({});
  const [largest, setLargest] = useState(1);
  useEffect(() => {
    ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/btcusdt@depth5@1000ms`
    );
    ws.onopen = () => {
      setWsOpen(true);
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      // console.log("response :", response);
      setWsResp(response);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (wsOpen) {
      const subscribe = {
        method: 'SUBSCRIBE',
        params: [`${coin.toLowerCase()}usdt@depth5@1000ms`],
        id: 1,
      };
      ws.send(JSON.stringify(unSubscribe));
      ws.send(JSON.stringify(subscribe));
      setUnSubscribe({
        method: 'UNSUBSCRIBE',
        params: [`${coin.toLowerCase()}usdt@depth5@1000ms`],
        id: 1,
      });
    }
  }, [wsOpen, coin]);

  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  useEffect(() => {
    if (wsResp.bids && wsResp.asks) {
      setLargest(1);
      setBids(wsResp.bids);
      setAsks(wsResp.asks);
    }
  }, [wsResp]);

  return (
    <div className="card order-book-card card-dark flex-grow-1 h-100">
      <div className="opt-tab d-flex justify-content-between text-left px-4">
        <div className="tab-itm col-3">Price</div>
        <div className="tab-itm col-4">Amount</div>
        <div className="tab-itm col-4">USD</div>
      </div>
      <div className="order-book-list d-flex flex-column flex-grow-1">
        {bids
          ? bids.map((bid) => {
              if (bid[0] * bid[1] > largest) {
                setLargest(bid[0] * bid[1]);
              }
              return (
                <OrderListItem
                  key={bid}
                  value={bid}
                  percentage={62}
                  color="#EF5350"
                  largest={largest}
                  setLargest={setLargest}
                />
              );
            })
          : ''}
        <h4 className="d-flex justify-content-between m-0 px-4 py-2">
          <span className="col">0.16772</span>
          <span className="col text-right">
            $
            {cryptoTimeRate
              ? usdAmountFormatter.format(cryptoTimeRate.value)
              : ''}
          </span>{' '}
        </h4>
        {asks
          ? asks.map((bid) => {
              if (bid[0] * bid[1] > largest) {
                setLargest(bid[0] * bid[1]);
              }
              return (
                <OrderListItem
                  key={bid}
                  value={bid}
                  percentage={62}
                  color="#26A69A"
                  largest={largest}
                  setLargest={setLargest}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
}

export default OrderBookCard;
