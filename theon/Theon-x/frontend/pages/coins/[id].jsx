import React, { useState } from "react";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
import CoinData from "../../components/coinWidget/CryptoData";
//price charts
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
// import Skeleton from "./Skeleton";
//price charts
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const CoinId = ({ coinIDX, coin }) => {
	// console.log(coinIDX);
	// console.log(coin)

	const { id } = useParams();
	const { response } = coinIDX;

	//price charts
	const coinChartData = coinIDX.prices.map((value) => ({
		x: value[0],
		y: value[1].toFixed(2),
	}));
	//price charts

	const options = {
		responsive: true,
	};
	//price charts

	const data = {
		labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
		datasets: [
			{
				fill: true,
				label: id,
				data: coinChartData.map((val) => val.y),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};
	return (
    <div className="container">
      <div className="coinPageId rowx">
        <header className="coinId_Header">
          <Link href="/coins">
            <span className="idCoinName"> Coins</span>
          </Link>
          <i className="bi bi-chevron-right"></i>{" "}
          <p className="id_Coin_price">{coin.name} price</p>
        </header>

        <div className="col70">
          <div className="coinId_Price_rank">
            <h6>
              Rank <span># </span> {coin.market_cap_rank}{" "}
            </h6>
            <p> {coin.categories[0]} </p>
          </div>

          <div className="coinId_Price">
            <img src={coin.image.small} alt="coin" />
            <h1 className="">{coin.name}</h1>
            <p> ( {coin.symbol}) </p>
          </div>
          <div className="coin_Id_price">
            <h1 className="">
              $
              {coin.market_data.current_price.usd?.toLocaleString({
                maximumFractionDigits: 5,
              }) < 10
                ? coin.market_data.current_price.usd
                : coin.market_data.current_price.usd?.toLocaleString()}
            </h1>
            <p>
              {coin.market_data.price_change_percentage_1h_in_currency?.usd <
              0 ? (
                <span className="red_id ">
                  {coin.market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
                    3
                  )}
                  % <i className="bi bi-caret-down-fill"></i>{" "}
                </span>
              ) : (
                <span className="green_id">
                  {coin.market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
                    3
                  )}
                  % <i className="bi bi-caret-up-fill"></i>{" "}
                </span>
              )}
            </p>
          </div>

          <div className="Information">
            <header> Information</header>
            <div>
              <ul className="id_media_coin_first">
                <a href={coin.links.homepage[0]}>
                  <li> Official Website </li>
                </a>
                <a href={coin.links.repos_url.github[0]}>
                  <li>
                    {" "}
                    {coin.links.repos_url.github[0]
                      ? coin.links.repos_url.github[0]
                      : "GitHub Link"}{" "}
                  </li>
                </a>
                {/* <a href={coin.links.homepage[0]}>
                  <li> Search on</li>
                </a> */}
              </ul>{" "}
              <ul className="id_media_coin ">
                <li>
                  <Dropdown className="btn_first_child">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Explorers
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={coin.links.blockchain_site[0]}>
                        {coin.name} link (1)
                      </Dropdown.Item>
                      <Dropdown.Item href={coin.links.blockchain_site[1]}>
                        {" "}
                        {coin.name} link (2)
                      </Dropdown.Item>
                      <Dropdown.Item href={coin.links.blockchain_site[2]}>
                        {" "}
                        {coin.name} link (2)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Community
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={coin.links.blockchain_site[0]}>
                        {coin.name} community (1)
                      </Dropdown.Item>
                      <Dropdown.Item href={coin.links.blockchain_site[1]}>
                        {" "}
                        {coin.name} community (2)
                      </Dropdown.Item>
                      <Dropdown.Item href={coin.links.blockchain_site[2]}>
                        {coin.name} community (3)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col30 coin_id_market_details">
          <p>
            <span> Total Volume</span>{" "}
            {coin.market_data.total_volume.usd
              ? coin.market_data.total_volume.usd?.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> Market Cap</span>{" "}
            {coin.market_data.market_cap.usd
              ? coin.market_data.market_cap.usd?.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> Fully Diluted Valuation</span>{" "}
            {coin.market_data.fully_diluted_valuation.usd
              ? coin.market_data.fully_diluted_valuation.usd?.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> Total Supply</span>{" "}
            {coin.market_data.total_supply
              ? coin.market_data.total_supply?.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> Max Supply</span>{" "}
            {coin.market_data.max_supply
              ? coin.market_data.max_supply?.toLocaleString()
              : "unavailable"}
          </p>

          <p>
            <span> Circulating Supply</span>{" "}
            {coin.market_data.circulating_supply
              ? coin.market_data.circulating_supply?.toLocaleString()
              : "unavailable"}{" "}
          </p>
        </div>
      </div>
      <hr />
      {/* Overview section */}
      <div className="rowx">
        <div className="col70">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Overview
              </button>
              <button
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Market
              </button>
              <button
                className="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Historical Data
              </button>
              <button
                className="nav-link"
                id="nav-disabled-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-disabled"
                type="button"
                role="tab"
                aria-controls="nav-disabled"
                aria-selected="false"
                disabled
              >
                Converter
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabIndex="0"
            >
              <div>
                <header className="price_chart_id_coin">
                  24 {coin.name} Price Chart
                  <span> ({coin.symbol}/USD)</span>
                </header>
                <Line options={options} data={data} />
              </div>
              <div className="price_change_percentage_1h_in_currency_id">
                <header> Price Change Percentage</header>
                <table className="price_change_percentage_table">
                  <tbody>
                    <tr className="price_change_percentage_tr">
                      <th>1h</th>
                      <th>24 h</th>
                      <th>7 d</th>
                      <th>30 d</th>
                      <th>1 y</th>
                    </tr>
                    <tr className="price_change_percentage_tr">
                      <td>
                        {" "}
                        {coin.market_data.price_change_percentage_1h_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {coin.market_data
                              .price_change_percentage_1h_in_currency.usd &&
                              coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {coin.market_data
                              .price_change_percentage_1h_in_currency.usd &&
                              coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>
                      <td>
                        {coin.market_data
                          .price_change_percentage_24h_in_currency.usd < 0 ? (
                          <span className="red_id_change ">
                            {coin.market_data
                              .price_change_percentage_24h_in_currency.usd &&
                              coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {coin.market_data
                              .price_change_percentage_24h_in_currency.usd &&
                              coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}{" "}
                      </td>
                      <td>
                        {coin.market_data.price_change_percentage_7d_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {coin.market_data
                              .price_change_percentage_7d_in_currency.usd &&
                              coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {coin.market_data
                              .price_change_percentage_7d_in_currency.usd &&
                              coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>{" "}
                      <td>
                        {coin.market_data
                          .price_change_percentage_30d_in_currency.usd < 0 ? (
                          <span className="red_id_change ">
                            {coin.market_data
                              .price_change_percentage_30d_in_currency.usd &&
                              coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {coin.market_data
                              .price_change_percentage_30d_in_currency.usd &&
                              coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}
                      </td>{" "}
                      <td>
                        {coin.market_data.price_change_percentage_1y_in_currency
                          .usd < 0 ? (
                          <span className="red_id_change ">
                            {coin.market_data
                              .price_change_percentage_1y_in_currency.usd &&
                              coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                                3
                              )}
                            % <i className="bi bi-caret-down-fill"></i>{" "}
                          </span>
                        ) : (
                          <span className="green_id_change">
                            {coin.market_data
                              .price_change_percentage_1y_in_currency.usd &&
                              coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                                2
                              )}
                            % <i className="bi bi-caret-up-fill"></i>{" "}
                          </span>
                        )}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabIndex="0"
            >
              Coming Soon
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
              tabIndex="0"
            >
              Coiming Soon
            </div>
            <div
              className="tab-pane fade"
              id="nav-disabled"
              role="tabpanel"
              aria-labelledby="nav-disabled-tab"
              tabIndex="0"
            >
              coin
            </div>
          </div>
          <h1 id="Overview"></h1>
        </div>

        {/* price Statistics */}
        <h1 id="Overview"></h1>
        <div className="col30 coin_id_market_details">
          <hr />
          <header> {coin.name} Price Statistics</header>
          <h6>{coin.name} Price Today</h6>
          <p>
            <span> {coin.name} Price</span>{" "}
            {coin.market_data.current_price.usd
              ? coin.market_data.current_price.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> 24h Low</span>{" "}
            {coin.market_data.low_24h.usd
              ? coin.market_data.low_24h.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> 24h High </span>{" "}
            {coin.market_data.high_24h.usd
              ? coin.market_data.high_24h.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Trading Volume</span>{" "}
            {coin.market_data.total_volume.usd
              ? coin.market_data.total_volume.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Market Cap Rank</span>{" "}
            {coin.market_cap_rank ? coin.market_cap_rank : "unavailable"}{" "}
          </p>{" "}
          <p>
            <span> Market Cap</span>{" "}
            {coin.market_data.market_cap.usd
              ? coin.market_data.market_cap.usd.toLocaleString()
              : "unavailable"}
          </p>
          <p>
            <span> All Time High</span>{" "}
            {coin.market_data.ath.usd
              ? coin.market_data.ath.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> All Time High Percent</span>{" "}
            {coin.market_data.ath_change_percentage.usd < 0 ? (
              <span className="red ath">
                {coin.market_data.ath_change_percentage.usd}
              </span>
            ) : (
              <span className="green ath">
                {coin.market_data.ath_change_percentage.usd}
              </span>
            )}
          </p>
          <p>
            <span> All Time Low</span>{" "}
            {coin.market_data.ath.usd
              ? coin.market_data.atl.usd.toLocaleString()
              : "unavailable"}{" "}
          </p>
          <p>
            <span> All Time Low Percent</span>{" "}
            {coin.market_data.atl_change_percentage.usd < 0 ? (
              <span className="red atl">
                {coin.market_data.atl_change_percentage.usd}%
              </span>
            ) : (
              <span className="green ath">
                {coin.market_data.atl_change_percentage.usd}%
              </span>
            )}
          </p>
        </div>
      </div>
      {/* Description */}
      <div className="Description">
        {/* <header>{coin.name} Description</header> */}
      </div>
      {/* Markets */}
      <div></div>
      <CoinData />
    </div>
  );
};

export default CoinId;

export async function getServerSideProps(context) {
	const { id } = context.query;
	const resquest =
		await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1d
    `);

	const CoinIdData = await resquest.json();

	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}
    `);
	const data = await res.json();
	return {
		props: {
			coinIDX: CoinIdData,
			coin: data,
		},
	};
}
