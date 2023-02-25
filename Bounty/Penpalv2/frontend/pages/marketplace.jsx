import React from "react";
import { useEffect, useState } from "react";
import { Contract, providers, utils } from "ethers";
import axios from "axios";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../constants/index";
import Link from "next/link";
import { useRouter } from "next/router";
import PolygonImg from "../public/assets/polygon.png";
import { Address } from "wagmi";
import { useAccount, useBalance } from "wagmi";
import { useSigner } from "wagmi";

const Marketplace = () => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [loadingState, setLoadingState] = useState("not-loaded");
  //auth

  //wagmi
  const { address } = useAccount();

  const { data: signer, isError, isLoading } = useSigner();

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const ftmTestnet = "https://rpc.testnet.fantom.network";
    const ankrTestnet = "https://rpc.ankr.com/fantom_testnet";

    /* create a generic provider and query for unsold market items */
    const provider = new providers.JsonRpcProvider(ankrTestnet);

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

 

    try {
      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenUri = await nftContract.tokenURI(i?.tokenId);
          const meta = await axios.get(tokenUri);
          let price = utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            itemId: i.itemId.toString(),
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            file: meta.data.file,
            name: meta.data.name,
            description: meta.data.description,
            category: meta.data.category,
            storyData: meta.data.storyData,
            rating: meta.data.rating,
          };

          // Check if the user owns the NFT
          const isOwner = await contract.getOwnerListedItems();
          if (isOwner) {
            item.fileUrl = meta.data.file;
          } else {
            // Set fileUrl to null to indicate that the file is not available
            item.fileUrl = null;
          }
          return item;
        })
      );
      setNfts(items);
      console.log(items);
      setLoadingState("loaded");
    } catch (error) {
      console.log("something went wrong ", error);
    }
  }

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true);

    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let convertedPrice = utils.parseUnits(price.toString(), "ether");
    if (convertedPrice > price) {
      console.log("Price");
    }
    const transaction = await nftMarketPlaceContract.buyItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      {
        value: convertedPrice,
      }
    );
    await transaction.wait();
    await router.push("/my-items");
    setIsPurchasing(false);
  };

  //import polygon current pricr from coingecko

  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd",
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(usdPrice.matic-network.usd)
  }, []);
  const favNfts = nfts;

  if (favNfts != undefined) {
    const UsdPrice = usdPrice
      ? ["matic-network"].usd * nfts.price
      : console.log(favNfts);
  }

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */

    const contract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }

  return (
    <div>
      {" "}
      <div className="nft_marketpace container">
        <header>Market Place</header>

        <div className="rowx ">
          {nfts.length && loadingState ? (
            nfts?.map((nft, i) => (
              <div key={i} className="col29 nft-img gradient-box">
                <div className=" gradient-box epic-img nft_home_img_width">
                  <div className="">
                    {nft.image ? <img src={nft.image} /> : "null"}
                  </div>
                </div>
                <div className="marketplace_nft_text">
                  {nft.name ? (
                    <p className="text-2xl font-semibold"> Name: {nft.name} </p>
                  ) : (
                    "null"
                  )}
                  {/* <div style={{ overflow: "hidden" }}>
                  <p className="text-gray-400">
                    {" "}
                    Description : {nft.description}
                  </p>
                </div> */}
                  <div className="">
                    <p className="nft_marketpace_Price">
                      <img
                        src={PolygonImg.src}
                        className="polygon"
                        alt="polygon"
                      />{" "}
                      {Number(nft?.price).toFixed(2)} MATIC
                    </p>
                    <p className="nft_price_in_usd">
                      <span>
                        {" "}
                        {usdPrice && nft
                          ? Number(usdPrice["matic-network"].usd).toFixed(22) *
                            Number(nft?.price).toFixed(22)
                          : null}{" "}
                        USD{" "}
                      </span>
                    </p>
                    {address != nft?.seller ? (
                      <button
                        className="marketplace_btn_buy"
                        onClick={() => {
                          // buyNFT(nft);
                          router.push(`/${nft.itemId}`);
                        }}
                      >
                        Buy
                      </button>
                    ) : (
                      <button
                        className="marketplace_btn_buy"
                        onClick={() => {
                          // buyNFT(nft);
                          router.push(`/${nft.itemId}`);
                        }}
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" No_purchase ">
              No purchase found.
              <br />
              Create your nfts with link below
              <br />
              <Link href="/">
                <button className="purchase-btn">Click here to buy some</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
