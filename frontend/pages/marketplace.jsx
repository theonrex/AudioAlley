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
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>

              <Link href="/upload">
                <button className="mt-4 purchase-btn">Click here to upload </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
