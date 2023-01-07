import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import CryptoData from "./coinWidget/CryptoData";
import HavenImg from "../public/haven.png";

// import image from client
import { urlFor } from "../lib/client";

function HeroBanner({ heroBanner }) {

  
  return (
    <div className="hero-banner-container ">
      <div className="container-xxl rowx">
        <div className="col6 banner_text">
          <h1 className="hero_h1">
            <span className="purple_text">Cryptocurrency News, </span> Trading,
            Analysis & Price Prediction
          </h1>
          <p className="hero_p purple_text">
            Welcome to Theon-X, your go-to source for all things Blockchain.
            Our website is designed to provide you with everything you need to
            stay up-to-date on the world of digital currencies, from real-time
            price updates to the latest news and articles.
          </p>
          <div className="home_banner_btn_div">
            {/* <Button className="banner_btn purple_btn_normal">
              Create an account
            </Button> */}
            <Button className="  purple_btn_normal_outlined" variant="outline">
              {" "}
              <a href="/coins"> View Market</a>{" "}
            </Button>
          </div>
        </div>

        <div className="col6 haven_img_banner">
          <img src={HavenImg.src} alt="" />{" "}
        </div>
      </div>
      <CryptoData />
    </div>
  );
}

export default HeroBanner;
