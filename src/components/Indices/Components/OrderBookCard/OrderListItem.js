import React, { useContext, useEffect } from 'react';
import { OptionsContext } from '../../ContextAPI/OptionContext';

function OrderListItem({ value, color, largest, setLargest }) {
  // console.log("value :", value);

  let percentage = ((value[0] * value[1]) / (largest * 1.5)) * 100;
  const { usdAmountFormatter, btcAmountFormatter } = useContext(OptionsContext);
  return (
    <div
      className="flex-grow-1 d-flex justify-content-between order-list-itm text-left text-white px-4"
      style={{
        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${
          100 - percentage
        }%, ${color} ${100 - percentage}%, ${color} 100%)`,
      }}
    >
      <div className="tab-itm col-3 pr-0" style={{ color }}>
        {usdAmountFormatter.format(value[0])}
      </div>
      <div className="tab-itm col-4 pr-0">
        {btcAmountFormatter.format(value[1])}
      </div>
      <div className="tab-itm col-4 px-0">
        ${usdAmountFormatter.format(value[0] * value[1])}
      </div>
    </div>
  );
}

export default OrderListItem;
