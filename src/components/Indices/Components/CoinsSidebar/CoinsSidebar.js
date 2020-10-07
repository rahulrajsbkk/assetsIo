import React, { useState, useContext } from "react";
import btc from "../../Static/image/coins/btc.svg";
import bch from "../../Static/image/coins/bch.svg";
import eth from "../../Static/image/coins/eth.svg";
import lite from "../../Static/image/coins/litecoin.svg";
import mon from "../../Static/image/coins/monero.svg";
import usdt from "../../Static/image/coins/usdt.svg";
import xrp from "../../Static/image/coins/xrp.svg";

import binance from "../../Static/image/exchanges/binance.svg";
import bitfinex from "../../Static/image/exchanges/bitfinex.svg";
import coinbase from "../../Static/image/exchanges/coinbase.svg";
import crex24 from "../../Static/image/exchanges/crex24.svg";
import four from "../../Static/image/exchanges/four.svg";

import { OptionsContext } from "../../ContextAPI/OptionContext";
import back from "../../Static/image/back-left.svg";
import { useEffect } from "react";
import Axios from "axios";

function CoinsSidebar({ isToken }) {
  const {
    setCoin,
    searchOn,
    setSearchOn,
    setCoinDetail,
    usdAmountFormatter,
    isExchange,
    setIsExchange,
    setExchDetail,
  } = useContext(OptionsContext);
  const [searchStr, setSearchStr] = useState("");

  const list = [
    {
      name: "Monero",
      price: 7659,
      percent: 2.3,
      symbol: "XMR",
      icon: mon,
    },
    {
      name: "Litecoin",
      price: 7659,
      percent: 2.3,
      symbol: "LTC",
      icon: lite,
    },
    {
      name: "Ripple",
      price: 7659,
      percent: 2.3,
      symbol: "XRP",
      icon: xrp,
    },
    {
      name: "Bitcoin",
      price: 7659,
      percent: 2.3,
      symbol: "BTC",
      icon: btc,
    },
    {
      name: "Ethereum",
      price: 7659,
      percent: 2.3,
      symbol: "ETH",
      icon: eth,
    },
    {
      name: "Tether",
      price: 7659,
      percent: 2.3,
      symbol: "USDT",
      icon: usdt,
    },
    {
      name: "Bitcoin Cash",
      price: 7659,
      percent: 2.3,
      symbol: "BCH",
      icon: bch,
    },
  ];
  const [priceData, setPriceData] = useState({});
  useEffect(() => {
    Axios.get(
      "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XMR,XRP,BTC,ETH,USDT,BCH,LTC&tsyms=USD"
    ).then((res) => {
      const { data } = res;
      setPriceData(data.RAW);
    });
  }, []);

  const [rotate, setRotate] = useState(list);
  const [togler, setTogler] = useState(false);
  const next = (rot) => {
    console.log("rotate :", rotate);
    const arrVal = rot;
    arrVal.unshift(arrVal.pop());
    setRotate(arrVal);
    setTogler(!togler);
  };

  const prev = (rot) => {
    let arrVal = rot;
    arrVal.push(arrVal.shift());
    setRotate(arrVal);
    setTogler(!togler);
  };
  useEffect(() => {
    setCoin(rotate[3].symbol);
    setCoinDetail(rotate[3]);
  }, [rotate, togler, setCoin]);

  const svgNext = (
    <svg
      width="19"
      height="10"
      viewBox="0 0 19 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 0L19 10H17.1L9.5 1.99681L1.90001 10H0L9.5 0.00199318V0Z"
        fill="#8D8E9B"
      />
    </svg>
  );
  const svgPrev = (
    <svg
      width="19"
      height="10"
      viewBox="0 0 19 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 10L0 0H1.90001L9.5 8.00319L17.1 0H19L9.5 9.99801V10Z"
        fill="#8D8E9B"
      />
    </svg>
  );

  const [exchRot, setExchRot] = useState([
    {
      name: "CREX24",
      symbol: "",
      icon: crex24,
    },
    {
      name: "Coinbase",
      symbol: "",
      icon: coinbase,
    },
    {
      name: "Binance",
      symbol: "",
      icon: binance,
    },
    {
      name: "OKEX",
      symbol: "",
      icon: four,
    },
    {
      name: "Bitfinex",
      symbol: "",
      icon: bitfinex,
    },
  ]);

  const exchNext = (rot) => {
    const arrVal = rot;
    arrVal.unshift(arrVal.pop());
    setExchRot(arrVal);
    setExchDetail(arrVal[2]);
  };

  const exchPrev = (rot) => {
    let arrVal = rot;
    arrVal.push(arrVal.shift());
    setExchRot(arrVal);
    setExchDetail(arrVal[2]);
  };

  useEffect(() => {
    setExchDetail(exchRot[2]);
  }, [exchRot, setExchDetail]);

  const [filterList, setFilterList] = useState("");
  useEffect(() => {
    if (isExchange) {
      setFilterList(
        exchRot.filter((data) => {
          return data.name
            .toLowerCase()
            .includes(searchStr.toLocaleLowerCase());
        })
      );
    } else {
      setFilterList(
        list.filter((data) => {
          return (
            data.name.toLowerCase().includes(searchStr.toLocaleLowerCase()) ||
            data.symbol.toLowerCase().includes(searchStr.toLocaleLowerCase())
          );
        })
      );
    }
  }, [searchStr, isExchange]);

  useEffect(() => {
    setIsExchange(false);
    setSearchOn(false);
  }, [isToken]);
  return (
    <div
      className={
        "coins-sidebar d-flex flex-column" + (searchOn ? " search-on" : "")
      }
    >
      <div className="main d-flex flex-column h-100">
        {searchOn ? (
          <div className="search-btn">
            <input
              type="text"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              placeholder="Search Any Coin"
            />
            <i className="fas fa-search" />
            <div className="btn" onClick={() => setSearchOn(false)}>
              <img src={back} alt="" />
            </div>
          </div>
        ) : (
          ""
        )}
        {searchOn ? (
          isExchange ? (
            <div className="coin-list-detail exchange flex-grow-1">
              {filterList.map((itm, i) => {
                return (
                  <div
                    key={itm.symbol}
                    className="coin-itm-detail d-flex p-4"
                    onClick={() => {
                      setExchDetail(itm);
                    }}
                  >
                    <img src={itm.icon} alt="" className="icon" />
                    <h5 className="mx-2">{itm.name}</h5>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <div className="coin-list-detail flex-grow-1">
              {filterList.map((itm, i) => {
                const price = priceData[`${itm.symbol}`]
                  ? priceData[`${itm.symbol}`].USD.PRICE
                  : 0;
                const change24 = priceData[`${itm.symbol}`]
                  ? priceData[`${itm.symbol}`].USD.CHANGEPCT24HOUR
                  : 0;
                itm["price"] = price;
                itm["percent"] = change24;
                return (
                  <div
                    key={itm.symbol}
                    className="coin-itm-detail d-flex p-4"
                    onClick={() => {
                      setCoin(itm.symbol);
                      setCoinDetail(itm);
                      setSearchOn(false);
                    }}
                  >
                    <img src={itm.icon} alt="" className="icon" />
                    <h5 className="mx-2">{itm.name}</h5>
                    <h6 className="ml-auto">${price}</h6>
                    <h6 className={"mx-2" + (change24 > 0 ? " up" : " down")}>
                      ({usdAmountFormatter.format(change24)}%)
                    </h6>
                  </div>
                );
              })}{" "}
            </div>
          )
        ) : isExchange ? (
          <div className="coin-list flex-grow-1 d-flex flex-column">
            <div className="next" onClick={() => exchNext(exchRot)}>
              {svgNext}
            </div>
            {exchRot.map((itm, i) => {
              return (
                <div
                  key={itm.name}
                  className={
                    "d-flex coin-itm flex-grow-1" + (i === 2 ? " active" : "")
                  }
                  onClick={() => setExchDetail(itm)}
                >
                  <div className="d-flex flex-column mx-auto my-3">
                    <img src={itm.icon} alt="" />
                  </div>
                </div>
              );
            })}
            <div className="prev" onClick={() => exchPrev(exchRot)}>
              {svgPrev}
            </div>
          </div>
        ) : (
          <>
            <div className="coin-list flex-grow-1 d-flex flex-column position-relative">
              <div className="next" onClick={() => next(rotate)}>
                {svgNext}
              </div>
              {rotate.map((itm, i) => {
                return (
                  <div
                    key={itm.symbol}
                    className={
                      "d-flex coin-itm flex-grow-1" + (i === 3 ? " active" : "")
                    }
                    // onClick={() => setCoin(itm.symbol)}
                  >
                    <div className="d-flex flex-column mx-auto my-3">
                      <img src={itm.icon} alt="" />
                    </div>
                  </div>
                );
              })}
              <div className="prev" onClick={() => prev(rotate)}>
                {svgPrev}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CoinsSidebar;
