import React, { useState, useEffect } from "react";
import CountUp, { useCountUp } from "react-countup";
import axios from "axios";

const Countup = () => {
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
	
	console.log(totalCrypto);
  const totalListedCoins = totalCrypto?.data?.active_cryptocurrencies;
  const rex = 55;

  useCountUp({
    ref: "firstCounter",
    end: totalListedCoins,
    enableScrollSpy: true,
    scrollSpyDelay: 50,
  });
  useCountUp({
    ref: "secondCounter",
    end: 195,
    enableScrollSpy: true,
    scrollSpyDelay: 50,
  });
  useCountUp({
    ref: "thirdCounter",
    end: 195,
    enableScrollSpy: true,
    scrollSpyDelay: 50,
  });
  useCountUp({
    ref: "forthCounter",
    end: 195,
    enableScrollSpy: true,
    scrollSpyDelay: 50,
  });
  return (
    <div className="container-xxl">
      <div className="rowx count_up">
        <h1 className="col25">
          <span id="firstCounter" />+
          <br />
          <span className="countUp_span">Coins </span>{" "}
        </h1>
        <h1 className="col25">
          <span id="secondCounter" />+
          <br />
          <span className="countUp_span">Crypto News</span>{" "}
        </h1>
        <h1 className="col25">
          <span id="thirdCounter" />+
          <br />
          <span className="countUp_span">Users</span>{" "}
        </h1>
        <h1 className="col25">
          <span id="forthCounter" />+
          <br />
          <span className="countUp_span">Articles</span>{" "}
        </h1>
      </div>

      <h1></h1>
    </div>
  );
};

export default Countup;
