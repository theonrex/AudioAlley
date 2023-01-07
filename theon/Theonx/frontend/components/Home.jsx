import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import CryptoData from "./coinWidget/CryptoData";
import axios from "axios";

//img
import HavenImg from "../public/haven.png";
import Btc from "../images/btcup.png";
import Nft from "../images/nft.png";
import Trade from "../images/trade.png";
import Walletimg from "../images/wallet.png";
import Features from "./Features";
import CountUp from "./Countup";
// import image from client
import { urlFor } from "../lib/client";

function Home() {
  const [totalCrypto, settotalCrypto] = useState([]);

  // active_cryptocurrencies;
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/global`)

      .then((res) => {
        settotalCrypto(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const totalListedCoins = totalCrypto?.data?.active_cryptocurrencies;

  return (
    <div className="hero-banner-container container-xxl">
      <div className=" rowx">
        <div className="col6 banner_text">
          <h1 className="hero_h1 purple_text">
            Over{" "}
            {totalListedCoins?.toLocaleString()
              ? totalListedCoins?.toLocaleString()
              : "3000+"}
            <br />
            Supported Coins
          </h1>
          <p className="hero_p">
            Are you tired of using multiple platforms to track and manage your
            cryptocurrency portfolio? Look no further than theon-x, where you
            can access real-time prices for over{" "}
            {totalListedCoins?.toLocaleString()} supported coins. Our
            comprehensive list includes popular coins like Bitcoin, Ethereum,
            and Litecoin, as well as lesser-known altcoins that you may be
            interested in.
          </p>
          <Button className="banner_btn purple_btn_normal" variant="contained">
            <Link
              target="_blank"
              passHref
              rel="noopener noreferrer"
              href={`/coins`}
            >
              View Market
            </Link>
          </Button>
        </div>

        <div className="col6 haven_img_banner">
          <img src={Walletimg.src} alt="" />{" "}
        </div>
      </div>
      {/* second section */}

      <div className=" rowx Join_over">
        <div className="col6 haven_img_banner Join_over_img">
          <img src={Btc.src} alt="" />{" "}
        </div>
        <div className="col6 banner_text join_us ">
          <h1 className="hero_h1 purple_text">
            Join millions of <br />
            users and open a wallet
          </h1>
          <p className="hero_p">
            In addition to providing real-time prices for over, theon-x also
            provides a link to open a wallet with some of our recommended
            platforms. This includes popular exchanges like Binance, Bybit,
            Coinbase, as well as secure wallets like Trust Wallet and MetaMask.
            By choosing theon-x, you can access a wide range of trusted and
            reliable platforms to securely store and manage your
            cryptocurrencies.
          </p>
          <Button className="banner_btn purple_btn_normal" variant="contained">
            <Link
              target="_blank"
              passHref
              rel="noopener noreferrer"
              href={`/CreateWallet`}
            >
              Create Wallet{" "}
            </Link>
          </Button>
        </div>
      </div>
      {/* Third section */}

      <div className=" rowx  ">
        {/* <header className="banner_text_header purple_text">
					{" "}
					Create Your cryptocurrency <br /> portfolio today
				</header>
				<p className="banner_text_p">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
					deleniti repellat atque provident dignissimos rerum. Temporibus, quod
					totam labore quibusdam architecto voluptates exercitationem nemo
					nulla, sint earum perferendis, maxime sit!
				</p> */}
        <div className="col6 banner_text banner_news">
          <h1 className="hero_h1 purple_text">
            Get The Latest <br />
            Blockchain News
          </h1>
          <p className="hero_p">
            Whether you are a beginner or an experienced crypto trader, theon-x
            has everything you need to stay informed and make informed
            decisions. Our news feed is updated continuously throughout the day,
            so you can always access the most current information and insights.
          </p>
          <section className="create_portfolio">
            <div className=" rowx banner_news_col1_5"></div>
            <div className=" rowx banner_news_col1_5">
              <Button
                className="banner_btn purple_btn_normal"
                variant="contained"
              >
                <Link
                  target="_blank"
                  passHref
                  rel="noopener noreferrer"
                  href={`/news`}
                >
                  Read News
                </Link>
              </Button>
            </div>
          </section>
        </div>
        <div className="col6 haven_img_banner_Nft ">
          <img src={Nft.src} alt="" />{" "}
        </div>
      </div>
      <div>
        <Features />
      </div>
      <div>
        <CountUp />
      </div>
    </div>
  );
}

export default Home;
