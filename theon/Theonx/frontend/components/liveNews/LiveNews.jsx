import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function LiveNews() {
  const [liveNews, setLiveNews] = useState([]);
  //get data from coingecko
  const [data, setData] = useState(false);

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
        setData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const theonxNews = liveNews.results;

  console.log(theonxNews);

  //cryptopanic.com/api/v1/posts/?auth_token=08eaed58a4c964032efba9463b82ae360c214b3a
  if (data == false)
    return (
      <div className="loader-3">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    );

  return (
    <div className="news_bg container">
      <p>
        Stay up-to-date with the latest blockchain news and trends with theon-x.
        Our platform provides real-time updates and comprehensive coverage of
        the most important developments in the world of cryptocurrencies and
        digital assets.
      </p>
      {theonxNews?.map((news, index) => (
          <div
          key={index}>
          <div className=" news_boxs">
            <div className="news_image"></div>
            <div className="news_text">
              <Link
                target="_blank"
                href={`https://cryptopanic.com/news/${news.id}/click/`}
              >
                <header>{news.title}</header>
              </Link>

              <span>
                Source <a href={news.sourcenews}> {news.source.title}</a>
              </span>

              <p> Created at {news.created_at}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
