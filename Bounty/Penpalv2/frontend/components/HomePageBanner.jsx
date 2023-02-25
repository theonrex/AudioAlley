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
import CarouselimgeOne from "../public/assets/headphones.jpg";
import CarouselimageTwo from "../public/assets/cta-2-left.png";
import { useAccount, useConnect, useSigner, useProvider } from "wagmi";
import Image from "next/image";


function HomePageBanner() {
  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [loadingState, setLoadingState] = useState("not-loaded");

  //wagmi signer
  const { data: signer, isError } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  // const provider = useProvider();

  // useEffect(() => {
  //   loadNFTs();
  // }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new providers.JsonRpcProvider(
      "https://rpc.testnet.fantom.network"
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

  console.log(nfts);

  const homeNft = nfts[1 || 3 || 5];

  if (homeNft != undefined) {
    console.log(homeNft);
  }
  // console.log(nfts);

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true);

    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let convertedPrice = utils.parseUnits(price.toString(), "ether");

    const transaction = await nftMarketPlaceContract.buyItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      {
        value: convertedPrice,
      }
    );
    loadNFTs();
    await transaction.wait();
    await router.push("/my-items");
    setIsPurchasing(false);
  };

  // connect wallet alert

  const connectWallet = () => {
    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };

  // const placeBid = () => {
  //   if (typeof window !== "undefined") {
  //     alert(" Function not availabe now. Try again later");
  //   }
  // };



  return (
    <div className="  first-section" id="Home" data-aos="fade-right">
  
      <div className="container rowX">
        <div className="col50 first-nft ">
          <h1 className="gather">
            Discover Digital Artworks & Collect <span>Best NFTs </span>{" "}
          </h1>
          <p>
            Get Started with the easiest and most secure platform to buy and
            trade digital ART and NFT&apos;s
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
            <div className="ending">
              <h5> {homeNft?.name}</h5>
              <h5> Hightest Bid</h5>
            </div>
            <div className="timer">
              <ul>
                <li id="days" />
                <li id="hours" />
                <li id="minutes" />
                <li id="seconds" />
              </ul>
              <p>{homeNft?.price} MATIC</p>
            </div>
            <div className="bid-btn">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageBanner;
