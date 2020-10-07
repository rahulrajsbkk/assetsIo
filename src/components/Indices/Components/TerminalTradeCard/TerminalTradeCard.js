import React, { useState } from "react";
import TerminalTabView from "./TerminalTabView";
import RecentTradesTabView from "./RecentTradesTabView";

function TerminalTradeCard() {
  const [tab, setTab] = useState("terminal");
  return (
    <div className="card card-terminal-trades card-dark flex-grow-1 h-100 d-flex flex-column">
      <div className="opt-tab d-flex">
        <div
          className={"tab-itm w-50 p-3 " + (tab === "recent" ? "active" : "")}
          onClick={() => setTab("recent")}
        >
          Recent Trades
        </div>
        <div
          className={"tab-itm w-50 p-3 " + (tab !== "recent" ? "active" : "")}
          onClick={() => setTab("terminal")}
        >
          Terminal
        </div>
      </div>
      {tab === "recent" ? <RecentTradesTabView /> : <TerminalTabView />}
    </div>
  );
}

export default TerminalTradeCard;
