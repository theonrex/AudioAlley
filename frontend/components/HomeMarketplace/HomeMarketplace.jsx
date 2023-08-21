import React from "react";
import { useEffect, useState } from "react";
import { Contract, providers, utils } from "ethers";
import axios from "axios";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ABI,
} from "../../constants/index";
import { useAccount, useSigner } from "wagmi";
import Image from "next/image";
import LoadingBox from "../loadingBox";

import TextBox from "../loadingBox/textBox";
import Link from "next/link";
import { useRouter } from "next/router";
import FTMImg from "../../public/assets/ftm.png";

function HomeMarketplace() {
  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();

  const { connector: activeConnector, isConnected } = useAccount();

  const connectWallet = () => {
    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };

  const [loadingState, setLoadingState] = useState("not-loaded");
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
          rating: meta.data.rating,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  const homePageNft = nfts?.slice(0, 3);

  if (homePageNft != undefined) {
    // console.log(homePageNft);
  }
  // console.log(nfts?.slice(0, 4));

  //    const first7Articles = articles?.slice(0, 7);

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

  //link [id]
  const homeNft = nfts[2];

  const ROUTE_POST_ID = "posts/[id]";
  const posts = [
    {
      id: homeNft?.name,
      title: homeNft?.tokenId,
    },
  ];
  const router = useRouter();

  return (
    <>
      <div
        className="third-section container"
        id="Marketplace"
        data-aos="flip-left"
      >
        <p>
          Welcome to the virtual world&apos;s one-stop-shop for the very best
          digital assets. Here you can <br />
          search and buy creators&apos;s ASSETS with FTM.
        </p>

        <div className="rowX nft-mg">
          {homePageNft.map((homeNft, _index) => (
            <div
              className="col29 homepage_market "
              // key={`post-${homeNft.id}`}
              key={_index}
              onClick={() => {
                // buyNFT(nft);
                // router.push(`/${homeNft.tokenId}`);
              }}
            >
              {homePageNft ? (
                <div>
                  {" "}
                  <div className=" epic-img nft_home_img_width">
                    <Image
                      src={homeNft.image}
                      alt={`${homeNft?.name}`}
                      width={300}
                      height={300}
                    />
                  </div>
                  <br />
                  <div className="nft_home_col29_text">
                    <h3>
                      <span>#{homeNft.tokenId} </span> {homeNft.name}
                    </h3>
                    <h3 className="rating"> {homeNft?.rating} </h3>{" "}
                    <div className="ftm-sale">
                      <div>
                        {/* <img alt="svgImg" src={FTMImg.src} /> */}
                        {homeNft.price} FTM
                      </div>
                    </div>
                    <div className="epic-box">
                      <div className="epic">
                        {!isConnected ? (
                          <button
                            text="List NFT"
                            className="epic-btn"
                            onClick={connectWallet}
                          >
                            connect
                          </button>
                        ) : (
                          <button
                            className="epic-btn"
                            onClick={() =>
                              buyNFT(homeNft?.price.toString(), homeNft.tokenId)
                            }
                          >
                            {" "}
                            Buy Now
                          </button>
                        )}

                        <Image
                          src={homeNft.image}
                          alt={`${homeNft?.name}`}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div></div>
                    </div>
                  </div>{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  <div className=" epic-img nft_home_img_width">
                    <LoadingBox />
                  </div>
                  <br />
                  <div className="nft_home_col29_text">
                    <TextBox />
                    <TextBox />

                    <div className="ftm-sale">
                      <div>
                        {/* <img alt="svgImg" src={FTMImg.src} /> */}
                        <TextBox />
                      </div>
                    </div>
                    <div className="epic-box">
                      <div className="epic">
                        {!isConnected ? (
                          <button
                            text="List NFT"
                            className="epic-btn"
                            onClick={connectWallet}
                          >
                            connect
                          </button>
                        ) : (
                          <button
                            className="epic-btn"
                            onClick={() =>
                              buyNFT(homeNft?.price.toString(), homeNft.tokenId)
                            }
                          >
                            {" "}
                            Buy Now
                          </button>
                        )}

                        <img src={homeNft.image} alt="img" />
                      </div>
                    </div>
                  </div>{" "}
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="button-63  ">
          <a href="/marketplace">View More</a>
        </button>
      </div>
    </>
  );
}

export default HomeMarketplace;
