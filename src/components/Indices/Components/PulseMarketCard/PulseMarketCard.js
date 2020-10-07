import React, { useState } from "react";
import MarketTabView from "./MarketTabView/MarketTabView";

function PulseMarketCard() {
  const [tab, setTab] = useState("market");
  return (
    <div className="card card-pulse-market card-dark flex-grow-1 h-100">
      <div className="opt-tab d-flex">
        <div
          className={"tab-itm w-50 p-3 " + (tab === "pulse" ? "active" : "")}
          onClick={() => setTab("pulse")}
        >
          Pulse
        </div>
        <div
          className={"tab-itm w-50 p-3 " + (tab !== "pulse" ? "active" : "")}
          onClick={() => setTab("market")}
        >
          Market News
        </div>
      </div>
      <MarketTabView />
    </div>
  );
}

export default PulseMarketCard;
