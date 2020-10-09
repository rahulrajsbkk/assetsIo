import React from 'react';
import MainLayout from '../../Components/Layouts/MainLayout';
import TerminalTradeCard from '../../Components/TerminalTradeCard/TerminalTradeCard';
import PulseMarketCard from '../../Components/PulseMarketCard/PulseMarketCard';
import FundsCard from '../../Components/FundsCard/FundsCard';
import LiveTradesCard from '../../Components/LiveTradesCard/LiveTradesCard';
import ChartCard from '../../Components/ChartCard/ChartCard';
import OrderBookCard from '../../Components/OrderBookCard/OrderBookCard';
import { useState } from 'react';
import MainContentCard from '../../Components/MainContentCard/MainContentCard';

function Home({ asset }) {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <MainLayout className={`home-page ${fullScreen && 'fullscreen'}`}>
      <div className="one">
        {/* <ChartCard setFullScreen={setFullScreen} fullScreen={fullScreen} />
        <LiveTradesCard />
        <PulseMarketCard />
        <FundsCard /> */}
        <MainContentCard asset={asset} />
      </div>
      <div className="two">
        <div className="orderBookWrap">
          <OrderBookCard />
        </div>
        <div className="tradeCardWrap">
          <TerminalTradeCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
