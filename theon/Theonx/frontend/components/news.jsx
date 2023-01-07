import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


const news = () => {

  const [liveNews, setLiveNews] = useState([]);
  //get data from coingecko
  const [data, setData] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/news",
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setLiveNews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


 
  

  //cryptopanic.com/api/v1/posts/?auth_token=08eaed58a4c964032efba9463b82ae360c214b3a

  return (
    <div className="news_bg">
      <script
        src="https://cointelegraph.com/news-widget"
        data-ct-widget-limit="47"
        data-ct-widget-theme="dark"
        data-ct-widget-language="en"
      ></script>
      <p>
        Stay up-to-date with the latest blockchain news and trends with theon-x.
        Our platform provides real-time updates and comprehensive coverage of
        the most important developments in the world of cryptocurrencies and
        digital assets.
      </p>
      {liveNews.map((news, i) => (
        <Link href={news.linknews}>
          <div className="col30 news_boxs">
            <div className="news_image">
              <img src={news.image} alt="news image" />
            </div>
            <div className="news_text">
              <header>{news.title}</header>
              <span>
                Source <a href={news.sourcenews}> {news.sourcenews}</a>
              </span>
            </div>
          </div>
        </Link>
      ))}

   
    </div>
  );
};

export default news;
