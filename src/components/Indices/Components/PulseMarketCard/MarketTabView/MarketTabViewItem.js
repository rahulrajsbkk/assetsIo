import React from "react";
import moment from "moment-timezone";
import imgPlaceHolder from "../../../Static/image/image-placeholder.png";

function MarketTabViewItem({ news }) {
  const time = moment(news.publishedAt).format("YYYY-MM-DD HH:mm");
  return (
    <div className="d-flex market-itm py-2">
      <div className="mr-2 my-auto news-icon">
        <img
          src={news.thumbnail ? news.thumbnail : imgPlaceHolder}
          alt=""
          className="news-icon"
        />
      </div>
      <div>
        <h3>{news.title}</h3>
        <p>
          {news.description.slice(0, 100)}
          {news.description.length > 0 ? "...." : ""}
          <a target="_blank" href={news.url}>
            Read More
          </a>
        </p>
        <h6>{time}</h6>
      </div>
    </div>
  );
}

export default MarketTabViewItem;
