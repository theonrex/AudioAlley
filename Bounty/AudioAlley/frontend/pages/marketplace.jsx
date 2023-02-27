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
import MusicPlayer from "../components/music/MusicData";
import Demo from "../components/music/test";
import Play from "../components/music/Play";
import jsmediatags from "jsmediatags";

const Marketplace = () => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [duration, setDuration] = useState(0);

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


  useEffect(() => {
    const audioFile =
      "https://theonnfts.infura-ipfs.io/ipfs/QmYWHskuQmsNEnw8n8PXckoVi8Q3iW9VEowR2AzQ6KXmS4";
    jsmediatags.read(audioFile, {
      onSuccess: function (tags) {
        const durationInSeconds = tags.tags.duration;
        const durationInMinutes = durationInSeconds / 60;
        setDuration(durationInMinutes);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  }, []);


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
      <div className="nft_marketpace container">
        <header>Market Place</header>
        <div className=" ">
          <table></table>
          {nfts.length && loadingState ? (
            nfts?.map((nft, i) => (
              <table
                key={i}
                className="   nft_home_img_width marketplace_nft_text"
              >
                <thead>
                  <tr>
                    <th className="hashtag">#</th>
                    <th className="th_song_title">Title</th>
                    <th className="th_song_Category">Category</th>
                    <th className="th_song_Rating"> Rating</th>
                    <th className="th_song_duration">Duration</th>
                    <th className="th_song_price">Price / FTM</th>
                  </tr>
                </thead>

                <tbody>
                  {nfts.map((song) => (
                    <tr key={song.itemId}>
                      <td>
                        <span className="sondId_play">
                          {song.itemId}
                          <Demo />{" "}
                        </span>
                      </td>

                      <td>
                        <div className="song_title">
                          {song.image ? (
                            <img src={song.image} alt="" className="" />
                          ) : (
                            "null"
                          )}
                          <div>
                            <h5>{song.name ? song.name : "null"} </h5>
                            <h6>{song.name ? song.name : "null"}</h6>{" "}
                          </div>
                        </div>
                      </td>
                      <td className="th_song_Category">{song.category}</td>
                      <td className="th_song_Rating">{song.rating}</td>
                      <td className="th_song_duration">{duration}</td>
                      <td>
                        {" "}
                        {address != song?.seller ? (
                          <button
                            className="td_marketplace_btn_buy"
                            onClick={() => {
                              router.push(`/${song.itemId}`);
                            }}
                          >
                            Buy / {song.price}
                          </button>
                        ) : (
                          <button
                            className="td_marketplace_btn_buy"
                            onClick={() => {
                              router.push(`/${song.itemId}`);
                            }}
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* <p className="nft_marketpace_Price">
                  <img src={PolygonImg.src} className="fantom" alt="polygon" />{" "}
                  {Number(nft?.price).toFixed(2)} FTM
                </p> */}
              </table>
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
