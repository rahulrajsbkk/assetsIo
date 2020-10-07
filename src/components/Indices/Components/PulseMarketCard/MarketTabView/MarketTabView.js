import React, { useState, useEffect } from "react";
import MarketTabViewItem from "./MarketTabViewItem";
import Axios from "axios";

function MarketTabView() {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    Axios.get(
      "https://cryptocontrol.io/api/v1/public/news?key=f6cd3bac20e555bd0bf6860590324d21&latest=true"
    )
      .then((res) => {
        setNewsList(res.data);
      })
      .catch((err) => {
        console.log("err :", err);
      });
    return () => {};
  }, []);

  return (
    <div className="d-flex flex-grow-1 flex-column market-tab-view">
      <div className="d-flex flex-grow-1 flex-column px-3 tab-view-scroll">
        {newsList && Array.isArray(newsList)
          ? newsList.map((news, i) => {
              return <MarketTabViewItem key={news._id} news={news} />;
            })
          : ""}
      </div>
      <h5 className="text-center py-2 more">
        <i className="fab fa-youtube" /> News Portal
      </h5>
    </div>
  );
}

export default MarketTabView;
