import React from "react";
import TheonLogo from "../public/assets/theonrex plain.png"
const Footer = () => {
	return (
    <footer>
      <div>
        <div className="rowx container">
          <hr />
          <div className="col33 theonlog">
            <img src={TheonLogo.src} alt="theonlogo" />
            <h3>TheonNFTs</h3>
            <p>
              The leading NFT Marketplace on EthereumHome to the next generation
              of digital creators.Discover the best NFT collections.
            </p>
            <ul className="socail_media_ul">
              <li>
                <img src="https://img.icons8.com/nolan/64/discord-logo.png" />{" "}
              </li>{" "}
              <li>
                <img src="https://img.icons8.com/nolan/64/twitter.png" />{" "}
              </li>{" "}
              <li>
                <img src="https://img.icons8.com/nolan/64/youtube-play.png" />{" "}
              </li>{" "}
              <li>
                <img src="https://img.icons8.com/nolan/64/telegram-app.png"  />{" "}
              </li>
            </ul>
          </div>
          <div className="col33 MarketPlace">
            <h1> MarketPlace</h1>
            <ul>
              <li>Explore</li>
              <li>Article</li>
              <li>How It works</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="col33 Links">
            {" "}
            <h1> Links</h1>
            <ul>
              <li>Tokens</li>
              <li>API</li>
              <li> Big Bounty</li>
              <li>Become Partners</li>
            </ul>
          </div>
        </div>
        <p className="Reserved_footer"> 2022 . All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;