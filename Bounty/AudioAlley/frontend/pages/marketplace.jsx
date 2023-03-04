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
import FtmLogo from "../public/assets/ftm.png";
import { Address } from "wagmi";
import { useAccount, useBalance } from "wagmi";
import { useSigner } from "wagmi";
import Play from "../components/music/Play";

function AudioPlayer({ src }) {
  const [duration, setDuration] = useState({ minutes: 0, seconds: 0 });

  function handleLoadedMetadata(event) {
    const audio = event.target;
    const durationInSeconds = Math.round(audio.duration);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    setDuration({ minutes, seconds });
  }

  return (
    <div>
      <audio src={src} onLoadedMetadata={handleLoadedMetadata} />
      <p>
        {" "}
        {`${duration.minutes.toString().padStart(2, "0")}:${duration.seconds
          .toString()
          .padStart(2, "0")}`}
      </p>
    </div>
  );
}

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
      setLoadingState("loaded");
    } catch (error) {
      console.log("something went wrong ", error);
    }
  }

  //import ftm current price from coingecko

  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd",
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response.data);
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(usdPrice.fantom-network.usd)
  }, []);
  const favNfts = nfts;

  if (favNfts != undefined) {
    const UsdPrice = usdPrice
      ? ["fantom-network"].usd * nfts.price
      : console.log(null);
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
          <table className="   nft_home_img_width marketplace_nft_text">
            <thead>
              <tr>
                <th className="hashtag">ID</th>
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
                      <Play />
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
                  <td className="th_song_duration">
                    {" "}
                    <AudioPlayer src={song.file} />
                  </td>
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
                          router.push(`/profile/${song.itemId}`);
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
                  <img src={FtmLogo.src} className="fantom" alt="ftm" />{" "}
                  {Number(nft?.price).toFixed(2)} FTM
                </p> */}
          </table>
          <table></table>
          {nfts.length && loadingState ? null : (
            <div className=" No_purchase ">
              No purchase found.
              <br />
              Create your nfts with link below
              <br />
              <Link href="/upload">
                <button className="purchase-btn">Click here to upload </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
