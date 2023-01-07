import React from "react";
import Binance from "../../images/binance.png";
import MetaMask from "../../images/MetaMask_Fox.svg.png";
import Coinbase from "../../images/coinbase.jpg";
import TrustWallet from "../../images/trustwallet.png";

function CreateWallets() {
  return (
    <div className="rowx CreateWallets">
      <div className="col25">
        <img src={Binance.src} alt="binance" />
        <h4 className="wallet_name">Binance</h4>

        <h3 className="coins_supported">
          Coins Supported: 100+ including BTC, ETH.
        </h3>
        <h3 className="wallet_types">Type of wallet: Hot wallet</h3>
        <h4 className="wallet_price">Price: Free</h4>
        <button className=" purple_btn_normal">
          <a href="https://accounts.binance.me/en/register?ref=EGKEZSV4">
            {" "}
            Get Wallet
          </a>
        </button>
      </div>
      <div className="col25">
        <img src={MetaMask.src} alt="MetaMask" />
              <h4 className="wallet_name">MetaMask</h4>
              

        <h3 className="coins_supported">
          Coins Supported: 100+ including BTC, ETH.
        </h3>
        <h3 className="wallet_types">Type of wallet: Hot wallet</h3>
        <h4 className="wallet_price">Price: Free</h4>
        <button className=" purple_btn_normal">
          <a href="https://metamask.io/download/"> Get Wallet</a>
        </button>
      </div>{" "}
      <div className="col25">
        <img src={TrustWallet.src} alt="Trustwallet" />
        <h4 className="wallet_name">Trustwallet</h4>

        <h3 className="coins_supported">
          Coins Supported: 100+ including BTC, ETH.
        </h3>
        <h3 className="wallet_types">Type of wallet: Hot wallet</h3>
        <h4 className="wallet_price">Price: Free</h4>
        <button className=" purple_btn_normal">
          <a href="https://trustwallet.com/deeplink/"> Get Wallet</a>
        </button>
      </div>{" "}
      <div className="col25">
        <img src={Coinbase.src} alt="Coinbase" />
        <h4 className="wallet_name">Coinbase</h4>

        <h3 className="coins_supported">
          Coins Supported: 100+ including BTC, ETH.
        </h3>
        <h3 className="wallet_types">Type of wallet: Hot wallet</h3>
        <h4 className="wallet_price">Price: Free</h4>
        <button className=" purple_btn_normal">
          {" "}
          <a href="https://www.coinbase.com/signup"> Get Wallet</a>
        </button>
      </div>
    </div>
  );
}

export default CreateWallets;
