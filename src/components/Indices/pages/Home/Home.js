import React from 'react';
import MainLayout from '../../Components/Layouts/MainLayout';
import TerminalTradeCard from '../../Components/TerminalTradeCard/TerminalTradeCard';
import PulseMarketCard from '../../Components/PulseMarketCard/PulseMarketCard';
import FundsCard from '../../Components/FundsCard/FundsCard';
import LiveTradesCard from '../../Components/LiveTradesCard/LiveTradesCard';
import ChartCard from '../../Components/ChartCard/ChartCard';
import OrderBookCard from '../../Components/OrderBookCard/OrderBookCard';
import { useState } from 'react';

function Home() {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <MainLayout className={`home-page ${fullScreen && 'fullscreen'}`}>
      <div className="row m-0 px-3 pt-2 pb-0 h-50">
        <div className="col-lg-9 p-2 d-flex">
          <ChartCard setFullScreen={setFullScreen} fullScreen={fullScreen} />
        </div>
        <div className="col-lg-3 p-2 d-flex">
          <OrderBookCard />
        </div>
      </div>
      <div className="row m-0 px-3 pt-0 pb-2 h-50">
        <div className="col-lg-3 p-2 d-flex">
          <LiveTradesCard />
        </div>
        <div className="col-lg-3 p-2 d-flex">
          <PulseMarketCard />
        </div>
        <div className="col-lg-3 p-2 d-flex">
          <FundsCard />
        </div>
        <div className="col-lg-3 p-2 d-flex">
          <TerminalTradeCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
