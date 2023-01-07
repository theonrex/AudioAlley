import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GlobalData from "./GlobalData";

export default function Data() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `
https://api.coingecko.com/api/v3/global


`
      )

      .then((res) => {
        setMarkets(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(markets.data);

  return (
    <div className="widget_scroll">
      <GlobalData
        active={markets.data?.active_cryptocurrencies}
        market_pap_change={markets.data?.market_cap_change_percentage_24h_usd}
        market_cap_percentage={markets.data?.market_cap_percentage}
        markets={markets.data?.markets}
        total_market_cap={markets.data?.total_market_cap.usd}
        total_volume={markets.data?.total_volume.usd}
      />
    </div>
  );
}
