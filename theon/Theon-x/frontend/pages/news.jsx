import React, { useEffect } from 'react'
import LiveNews from '../components/liveNews/LiveNews'
import axios from "axios";

const news = () => {


  
  return (
    <div className="news_home">
      <header className="latest_news">Latest Crypto News</header>
      <LiveNews />
    </div>
  );
}

export default news;