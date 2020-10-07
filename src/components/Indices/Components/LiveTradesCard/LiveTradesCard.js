import React, { useState, useEffect, useContext, useRef } from 'react';
import LiveTadesTabView from './LiveTradeView/LiveTadesTabView';
import { OptionsContext } from '../../ContextAPI/OptionContext';
import Websocket from 'react-websocket';

let ws;
function LiveTradesCard() {
  const [tab, setTab] = useState('live');
  const { email } = useContext(OptionsContext);
  let wsRef = useRef();
  // const [wsOpen, setWsOpen] = useState(false);
  const [wsResp, setWsResp] = useState([]);
  // useEffect(() => {
  //   console.log('Enter :>> ', wsOpen);
  //   ws = new WebSocket(
  //     `wss://gxtokenoptions.azurewebsites.net/WebSocketHandler.ashx`
  //   );
  //   ws.onopen = () => {
  //     setWsOpen(true);
  //   };
  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     console.log('WsResponse :', response);
  //     setWsResp(response);
  //   };
  //   ws.onclose = () => {
  //     ws.close();
  //   };
  //   console.log('Exit :>> ', wsOpen);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (wsOpen) {
  //     // setInterval(() => {
  //     console.log('sending :>> ');
  //     ws.send(email);
  //     // }, 500);
  //   }
  // }, [wsOpen, email]);

  function handleData(data) {
    const response = JSON.parse(data);
    console.log('dataWS :>> ', response);
    setWsResp(response.PendingTrades);
  }

  const [interval, setIntervalVar] = useState();

  function handleOpen() {
    let inter = setInterval(() => {
      console.log('sent :>> ', email);
      wsRef.current.sendMessage(email);
    }, 1000);
    setIntervalVar(inter);
  }

  function handleClose() {
    clearInterval(interval);
  }

  return (
    <div className="card card-dark live-trade-card flex-grow-1 h-100">
      <Websocket
        url="wss://gxtokenoptions.azurewebsites.net/WebSocketHandler.ashx"
        onMessage={handleData}
        onOpen={handleOpen}
        onClose={handleClose}
        reconnect={true}
        debug={true}
        ref={(Websocket) => {
          wsRef.current = Websocket;
        }}
      />
      <div className="opt-tab d-flex">
        <div
          className={'tab-itm w-50 p-3 ' + (tab === 'copy' ? 'active' : '')}
          onClick={() => setTab('copy')}
        >
          Copy Trades
        </div>
        <div
          className={'tab-itm w-50 p-3 ' + (tab !== 'copy' ? 'active' : '')}
          onClick={() => setTab('live')}
        >
          Live Trades
        </div>
      </div>
      <LiveTadesTabView live={wsResp} tab={tab} />
      <h5 className="text-center py-2 more">
        <i className="tokenicon-all_trades"></i> All Trades
      </h5>
    </div>
  );
}

export default LiveTradesCard;
