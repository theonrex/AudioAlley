import React from "react";

export default function GlobalData({
  url,
  total_volume,
  total_market_cap,
  image,

  market_cap_rank,
}) {
  return (
    <div className="container-xxl widget_container rowx">
      <div className="coin_row rowx">
        <div className=" global_details">
          <h4 className="global_total_market_cap">
            Global Market Cap:{" "}
            <span>
              ${" "}
              {total_market_cap?.toLocaleString({
                maximumFractionDigits: 5,
              }) }
            </span>
          </h4>
        </div>

        {/* <CryptoData/> */}
      </div>
    </div>
  );
}
