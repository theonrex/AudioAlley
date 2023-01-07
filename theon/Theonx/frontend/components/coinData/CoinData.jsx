import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { Sparklines, SparklinesLine } from "react-sparklines";
// import Pagenations from "../pagenation/pagenation"
import Data from "../globalCrypoData/Data";

import CoinDisplay from "../coinSearch/CoinDisplay";
const CoinData = ({ coinsData }) => {
  const [markets, setMarkets] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState(markets);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCrypto, settotalCrypto] = useState([]);

  const router = useRouter();
  // active_cryptocurrencies;
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/global`)

      .then((res) => {
        settotalCrypto(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(totalCrypto.data.active_cryptocurrencies);
  // pagenation
  const loadMore = () => {
    setPage((page) => page + 1);
  };
  //get data from coingecko
  useEffect(() => {
    ["characters", page],
      axios
        .get(
          `


          
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y`
        )

        .then((res) => {
          setMarkets(res.data);
        })
        .catch((error) => console.log(error));
  }, [page]);
  //search
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredCoins(
      markets.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setFilteredCoins(markets);
  }, [markets]);

  //hander pagenation

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(
      `coins/?page=${value}`,
      undefined,
      { shallow: false },
      { scroll: true }
    );
  }

  //paganation control
  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, [router.query.page]);

  // // search markets
  // const handleChange = (e) => {
  // 	setSearch(e.target.value);
  // };
  // const filteredMarkets = markets.filter((coin) =>
  // 	markets.name?.toLowerCase().includes(search.toLowerCase())
  // );

  // console.log(filteredMarkets);

  //get number of listed coin perpage

  const perPage = 30;
  const totalListedCoins = totalCrypto?.data?.active_cryptocurrencies;

  const result = totalListedCoins / perPage;
  console.log(result);

  return (
    <div className="coinData_container">
      <div className="container-xxl ">
        <div className="col100">
          <div className="CoinDisplay_data">
            <CoinDisplay />
            <Data />
          </div>

          <div className="market_data">
            <div>
              <table>
                <tbody>
                  <tr className="table_tr_id">
                    <th className="market_cap_rank">No</th>
                    <th className="market_cap_rank">Coin</th>
                    <th className="market_cap_rank">Price</th>
                    <th className="last_1h">1h</th>
                    <th className="market_cap_rank">24h</th>
                    <th className="last_7h">7d</th>
                    <th className="coin_24_Volume">24 Volume</th>
                    <th className="market_cap_rank market_cap_head">Mkt Cap</th>
                    <th className="circulating_supply">Circulating Supply</th>
                    <th className="Last_7_Days">Last 7 Days</th>
                  </tr>

                  {markets.map((market) => {
                    return (
                      <tr target="_blank" className="market_Hover">
                        <td className="market_cap_rank">
                          <>{market.market_cap_rank}</>
                        </td>
                        <td className="coin_name_widget">
                          <Link
                            target="_blank"
                            passHref
                            rel="noopener noreferrer"
                            href={`/coins/${market.id}`}
                            key={market.id}
                          >
                            <div className="">
                              <img src={market.image} alt="coin" />
                            </div>
                            <h4 className="coin_name_widget_s">
                              {market.name}{" "}
                            </h4>
                            <h4 className="coin_symbol_widget">
                              {market.symbol}{" "}
                            </h4>
                          </Link>
                        </td>
                        <td className="price_widget">
                          <Link
                            target="_blank"
                            passHref
                            rel="noopener noreferrer"
                            href={`/coins/${market.id}`}
                            key={market.id}
                          >
                            <h4 className="price_widget">
                              $
                              {market.current_price?.toLocaleString({
                                maximumFractionDigits: 5,
                              }) < 10
                                ? market.current_price
                                : market.current_price?.toLocaleString()}
                            </h4>
                          </Link>
                        </td>
                        <td className="price_change_percentage_1h_in_currency">
                          <div className="">
                            {market.price_change_percentage_1h_in_currency <
                            0 ? (
                              <p className="red">
                                {market.price_change_percentage_1h_in_currency &&
                                  market.price_change_percentage_1h_in_currency.toFixed(
                                    2
                                  )}
                                % <i className="bi bi-caret-down-fill"></i>{" "}
                              </p>
                            ) : (
                              <p className="green">
                                {market.price_change_percentage_1h_in_currency &&
                                  market.price_change_percentage_1h_in_currency.toFixed(
                                    2
                                  )}
                                % <i className="bi bi-caret-up-fill"></i>{" "}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="price_change_percentage_24h">
                          <div className="">
                            {market.price_change_percentage_24h < 0 ? (
                              <p className="red">
                                {market.price_change_percentage_24h ==
                                market.price_change_percentage_24h?.toFixed(1)
                                  ? market.price_change_percentage_24h?.toFixed(
                                      1
                                    )
                                  : market.price_change_percentage_24h}
                                % <i className="bi bi-caret-down-fill"></i>{" "}
                              </p>
                            ) : (
                              <p className="green">
                                {market.price_change_percentage_24h &&
                                  market.price_change_percentage_24h.toFixed(1)}
                                % <i className="bi bi-caret-up-fill"></i>{" "}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="price_change_percentage_7d_in_currency last_7h">
                          <div className="">
                            {market.price_change_percentage_7d_in_currency <
                            0 ? (
                              <p className="red">
                                {market.price_change_percentage_7d_in_currency &&
                                  market.price_change_percentage_7d_in_currency.toFixed(
                                    3
                                  )}
                                % <i className="bi bi-caret-down-fill"></i>{" "}
                              </p>
                            ) : (
                              <p className="green">
                                {market.price_change_percentage_7d_in_currency &&
                                  market.price_change_percentage_7d_in_currency.toFixed(
                                    3
                                  )}
                                % <i className="bi bi-caret-up-fill"></i>{" "}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="total_volume">
                          <div className="">
                            {market.total_volume?.toLocaleString({
                              maximumFractionDigits: 5,
                            }) < 10
                              ? market.total_volume
                              : market.total_volume?.toLocaleString()}
                          </div>
                        </td>
                        <td className="market_cap">
                          {market.market_cap?.toLocaleString({
                            maximumFractionDigits: 5,
                          }) < 10
                            ? market.market_cap
                            : market.market_cap?.toLocaleString()}
                        </td>
                        <td className="circulating_supply">
                          {market.circulating_supply?.toLocaleString({
                            maximumFractionDigits: 5,
                          }) < 10
                            ? market.circulating_supply
                            : market.circulating_supply?.toLocaleString()}
                        </td>
                        <td className="sparkline_in_7d">
                          {market.price_change_percentage_7d_in_currency < 0 ? (
                            <p className="">
                              <Sparklines data={market.sparkline_in_7d.price}>
                                <SparklinesLine color="red" />
                              </Sparklines>
                            </p>
                          ) : (
                            <p className="">
                              <Sparklines data={market.sparkline_in_7d.price}>
                                <SparklinesLine color="green" />
                              </Sparklines>
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="stack_pagenation">
          <Stack spacing={1}>
            <Pagination
              variant="outlined"
              shape="rounded"
              className="pagination"
              page={page}
              size="small"
              onChange={handlePaginationChange}
              count={result.toFixed(0)}
              color="secondary"
            />
          </Stack>

          {/* <Pagenations/> */}
        </div>
      </div>
    </div>
  );
};

export default CoinData;

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  const coinsData = await res.json();

  return {
    props: {
      coinsData,
    },
  };
};
