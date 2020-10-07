import React, { useState, useContext, useEffect } from "react";
import { OptionsContext } from "../../ContextAPI/OptionContext";
import moment from "moment-timezone";

function RecentTradesTabView() {
  const { transactions, usdAmountFormatter } = useContext(OptionsContext);
  const [tab, setTab] = useState("all");
  const [tansList, setTansList] = useState([]);
  useEffect(() => {
    if (Array.isArray(transactions))
      switch (tab) {
        case "win": {
          setTansList(
            transactions.filter(
              (transaction) => transaction.winPercentage !== "0"
            )
          );
          break;
        }
        case "loss": {
          setTansList(
            transactions.filter(
              (transaction) => transaction.winPercentage === "0"
            )
          );
          break;
        }
        default:
          setTansList(transactions);
      }
  }, [transactions, tab]);
  return (
    <div className="d-flex flex-grow-1 flex-column trades-tab-view">
      <div className="tab-btn d-flex justify-content-around px-3">
        <div
          className={"tab-btn-itm " + (tab === "all" ? "active" : "")}
          onClick={() => setTab("all")}
        >
          All
        </div>
        <div className="border-left my-2" />
        <div
          className={"tab-btn-itm " + (tab === "win" ? "active" : "")}
          onClick={() => setTab("win")}
        >
          Win
        </div>
        <div className="border-left my-2" />
        <div
          className={"tab-btn-itm " + (tab === "loss" ? "active" : "")}
          onClick={() => setTab("loss")}
        >
          Loss
        </div>
      </div>
      <div className="trade-list flex-grow-1 d-flex flex-column">
        <div className="d-flex text-white text-small text-left fund-list-head px-3">
          <div className="col-3 px-1">Date</div>
          <div className="col-3 px-1">Trade</div>
          <div className="col-3 px-1">Amount</div>
          <div className="col-3 px-1">Result</div>
        </div>
        <div className="flex-grow-1 tab-view-scroll">
          {tansList && Array.isArray(tansList)
            ? tansList.map((transaction) => {
                if (
                  transaction.requestType === "Upper" ||
                  transaction.requestType === "Lower"
                )
                  return (
                    <div
                      key={transaction.id}
                      className="d-flex text-white fund-list-item pl-3 pr-2"
                    >
                      <div className="col-3 px-1 d-flex">
                        <div className="d-flex flex-column">
                          <h6 className="m-0">
                            {moment.utc(transaction.time).format("DD/MM/YYYY")}
                          </h6>
                          <p className="m-0">
                            {moment.utc(transaction.time).format("hh:mm:ss A")}{" "}
                            UTC
                          </p>
                        </div>
                      </div>
                      <div className="col-3 px-1 my-auto">
                        <i
                          className={
                            "fas mx-1 " +
                            (transaction.requestType === "Upper"
                              ? "fa-long-arrow-alt-up text-success"
                              : "fa-long-arrow-alt-down text-danger")
                          }
                        />
                        {transaction.asset === "BTC" ? "Bitcoin" : "Ethereum"}
                      </div>
                      <div className="col-3 px-1 my-auto">
                        ${usdAmountFormatter.format(transaction.invested)}
                      </div>
                      {transaction.winPercentage === null ? (
                        <div className="col-3 px-1 text-primary my-auto">
                          Pending
                        </div>
                      ) : transaction.winPercentage === "0" ? (
                        <div className="col-3 px-1 text-danger my-auto">
                          Loss
                        </div>
                      ) : (
                        <div className="col-3 px-1 text-success my-auto">
                          Win
                        </div>
                      )}
                    </div>
                  );
              })
            : ""}
        </div>
      </div>
      <h5 className="text-center py-2 more">
        <i className="tokenicon-trade-history" /> Trade History
      </h5>
    </div>
  );
}

export default RecentTradesTabView;
