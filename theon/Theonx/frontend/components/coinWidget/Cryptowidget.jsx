import React from "react";
import CryptoData from "./CryptoData";

const Cryptowidget = ({
  url,
  name,
  price,
  image,
  price_change_percentage_24h,
  market_cap_rank,
}) => {
  // console.log(CryptoData);
  return (
    <div className="container-xxl widget_container rowx">
      <div className="coin_row ">
        <div className="">
          <img src={image} alt="coin" />
        </div>
        <div className=" widget_Details">
          {url}
          <h1 className="coin_name_widget">{name} </h1>
          <h4 className="price_widget">$ {price}</h4>
          {price_change_percentage_24h < 0 ? (
            <p className="red">
              {" "}
              {price_change_percentage_24h.toFixed(3)}%{" "}
              <i className="bi bi-caret-down-fill"></i>{" "}
            </p>
          ) : (
            <p className="green">
              {" "}
              {price_change_percentage_24h.toFixed(3)}%{" "}
              <i className="bi bi-caret-up-fill"></i>{" "}
            </p>
          )}
        </div>

        {/* <CryptoData/> */}
      </div>
    </div>
  );
};

export default Cryptowidget;
