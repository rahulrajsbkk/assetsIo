import React from "react";

function Loader({ percentage }) {
  return (
    <div className="loader-spin position-relative m-auto">
      <div className="percent">
        <h2>{percentage}%</h2>
      </div>
      <svg
        version="1.1"
        id="L1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
        width="100%"
      >
        <circle
          fill="none"
          stroke="#787885"
          strokeWidth={1}
          strokeMiterlimit={5}
          strokeDasharray="40,20"
          cx={50}
          cy={50}
          r={39}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="5s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loader;
