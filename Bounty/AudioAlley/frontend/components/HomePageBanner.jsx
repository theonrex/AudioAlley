import React, { useState, useEffect } from "react";
import { Contract, providers, utils } from "ethers";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../constants/index";
import axios from "axios";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useAccount, useConnect, useSigner, useProvider } from "wagmi";
import Image from "next/image";

function HomePageBanner() {
  const [nfts, setNfts] = useState([]);

  const [loadingState, setLoadingState] = useState("not-loaded");

  //wagmi signer
  const { data: signer, isError } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new providers.JsonRpcProvider(
      "https://rpc.ankr.com/fantom_testnet"
    );

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );

    const contract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider
    );
    const data = await contract.getAllListedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  const homeNft = nfts[1 || 2 || 3];

  if (homeNft != undefined) {
    null;
  }
  // console.log(nfts);

  // connect wallet alert

  const connectWallet = () => {
    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };

  return (
    <div className="  first-section" id="Home" data-aos="fade-right">
      <div className="container rowX">
        <div className="col50 first-nft ">
          <h1 className="gather">
            Explore NFTs artworks on our web3 audio
            <span> streaming platform. </span>{" "}
          </h1>
          <p>
            Welcome to Audio Alley, the premier platform for music artists to
            showcase and sell their songs to a global audience. With our
            easy-to-use interface and robust features, you'll have everything
            you need to get your music out there and start earning money today.
          </p>
          <div className="explore">
            <button className="buy-btn ">
              <a href="/marketplace"> Explore More</a>
            </button>
          </div>
          <div className="first-counter">
            <h2 className="works">
              23 K+ <br /> <span> Music</span>
            </h2>
            <h2 className="works">
              20 K+ <br /> <span>Artist Profit</span>
            </h2>
            <h2 className="works">
              8 K+ <br /> <span>Artist</span>
            </h2>
          </div>
        </div>
        <div className="col50 nfthead">
          <div className="bid gradient-box">
            <div>
              <img
                src={homeNft?.image}
                alt="nft imaage"
                className="homenft_img"
              />
            </div>
            {/* <div className="ending">
              <h5> {homeNft?.name}</h5>
              <h5>Song Price </h5>
            </div>
            <div className="timer">
              <ul>
                <li id="days" />
                <li id="hours" />
                <li id="minutes" />
                <li id="seconds" />
              </ul>
              <p>{homeNft?.price} FTM</p>
            </div>
            <div className="bid-btn">
              <div></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageBanner;
