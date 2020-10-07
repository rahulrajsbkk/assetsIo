import React, { useContext } from "react";
import { OptionsContext } from "../../../ContextAPI/OptionContext";

function AssetItem({ img, name, price, symbol, setCoinObject, coinObject }) {
  const { usdAmountFormatter, setTransCoin, transCoin } = useContext(
    OptionsContext
  );

  return (
    <div
      className={
        "asset-item d-flex p-4 justify-content-between " +
        (symbol === transCoin ? "active" : "")
      }
      onClick={() => {
        setTransCoin(symbol);
        setCoinObject(coinObject);
      }}
    >
      <div className="d-flex">
        <img src={img} className="icon my-auto" alt="" />
        <h4 className="mx-2">{name}</h4>
      </div>
      <h4>${usdAmountFormatter.format(price)}</h4>
    </div>
  );
}

export default AssetItem;
