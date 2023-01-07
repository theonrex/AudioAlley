import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

const TopTenCoin = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`
      )

      .then((res) => {
        setMarkets(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(markets.circulating_supply);
  return (
    <div>
      TopTenCoin
      {markets.map((market) => {
        // <Link href={`/coins/${market.id}`} key={market.id}>
        <div>
          <h1>{market} g</h1>
          <td className="market_cap_rank">
            <>{market.market_cap_rank}</>
          </td>
        </div>;
        {
          /* </Link>; */
        }
      })}
    </div>
  );
};

export default TopTenCoin;
