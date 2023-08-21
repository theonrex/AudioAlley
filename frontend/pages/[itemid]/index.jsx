import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useSigner, useAccount, useBalance } from "wagmi";
import { useRouter } from "next/router";
import NftInfo from "../../components/nft-info/NftInfo";
import Loading from "../../components/Loading";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ABI,
} from "../../constants/index";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
const ReactJkMusicPlayer = dynamic(() => import("react-jinke-music-player"), {
  ssr: false,
});

export default function Itemid() {
  const router = useRouter();
  let { itemid } = router.query;
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const ankrTestnet = "https://rpc.ankr.com/fantom_testnet";
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  const { connector: isConnected, address } = useAccount();
  useEffect(() => {
    setConnected(isConnected);
  }, []);
  //wagmi si  const [error, setError] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(true);

    const provider = new ethers.providers.JsonRpcProvider(ankrTestnet);
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );
    const nftMarketPlaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider
    );
    const data = await nftMarketPlaceContract.getPerticularItem(
      router.query.itemid
    );

    const user = address;

    const sub = await nftMarketPlaceContract.getSubscriptionPrice();
    const convertSub = ethers.utils.formatUnits(sub.toString(), "ether");
    const allData = async () => {
      let convertedPrice = ethers.utils.formatUnits(
        data.price.toString(),
        "ether"
      );
      const tokenUri = await nftContract.tokenURI(data.tokenId);
      const metaData = await axios.get(tokenUri);

      let item = {
        user,
        subscriptionPrice: convertSub,
        price: convertedPrice,
        tokenId: data.tokenId.toNumber(),
        seller: data.seller,
        owner: data.owner,
        image: metaData?.data?.image,
        artistName: metaData?.data?.artistName,
        name: metaData.data?.name,
        description: metaData.data.description,
        fileUrl: metaData.data.file,
        file: metaData.data.file,
        songData: metaData.data.songData,
      };
      setNftData(item);
    };
    allData();
    setLoading(false);
    setIsPurchasing(false);
  };

  useEffect(() => {
    const user = nftData?.user;

    if (!user) return; // Return early if user is not defined

    async function fetchData() {
      const contract = new ethers.Contract(
        NFT_MARKETPLACE_ADDRESS,
        NFT_MARKETPLACE_ABI,
        signer
      );

      const isActive = await contract.isSubscriptionActive(user);
      setIsActive(isActive);

      const expiryDate = await contract.getSubscriptionExpiry(user);
      setExpiryDate(expiryDate);
    }

    fetchData();
  }, [nftData?.user]);

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true);

    const nftMarketPlaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let convertedPrice = ethers.utils.parseUnits(price.toString(), "ether");

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

  useEffect(() => {
    const load = async () => {
      if (router.query.itemid) await loadNFT();
    };
    load();
  }, [itemid]);
  //check account balance
  const { data, refetch } = useBalance({
    address,
    watch: true,
  });

  const subscribe = async (subscriptionPrice, user) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setIsActive(false);

    try {
      // Create provider and signer
      const provider = new ethers.providers.JsonRpcProvider(ankrTestnet);
      const user = nftData?.user;

      // Create  contract instance
      const contract = new ethers.Contract(
        NFT_MARKETPLACE_ADDRESS,
        NFT_MARKETPLACE_ABI,
        signer
      );
      // let subscriptionPrice = await contract.getSubscriptionPrice();

      let convertedPrice = ethers.utils.parseEther(
        subscriptionPrice.toString(),
        "ether"
      );
      // subscriptionPrice = await subscriptionPrice.toString();

      // Subscribe to  contract
      const tx = await contract.subscribe(user, {
        value: convertedPrice,
      });
      await tx.wait();
      setSuccess(true);
      // console.log(convertedPrice);
    } catch (err) {
      console.error(err);
      setError("Something went wrong, refresh and try again");
    }

    setLoading(false);
    setIsActive(true); // Set isActive to true after subscription is complete
  };

  const audioList1 = [
    {
      name: nftData?.artistName,
      singer: nftData?.name,
      cover: nftData?.image,
      musicSrc: nftData?.fileUrl,
    },
  ];

  const options = {
    preload: false,
    defaultPlayMode: "order",
    mode: "full",
    autoPlay: false,
    responsive: false,
  };

  const [params, setParams] = useState({
    ...options,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef({});
  const handleGetAudioInstance = (audio) => {
    audioRef.current = audio;
  };

  const handleSongClick = (index) => {
    setSelectedSongIndex(index);
    setIsPlaying(true);
  };

  // if (loadingState === "not-loaded") {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {!nftData && loading ? (
        <div className="container m-auto Loading_page">
          <Loading />
        </div>
      ) : (
        <NftInfo nftData={nftData}>
          {data < nftData?.price ? (
            "insufficient amount for this transaction"
          ) : (
            <div className="subscribe_btn">
              {isConnected ? (
                <div>
                  {!isActive ? (
                    <button
                      className="nft_id_buy_btn"
                      onClick={() =>
                        subscribe(
                          nftData.subscriptionPrice.toString(),
                          nftData.user
                        )
                      }
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Subscribe for 0.03 FTM"}
                    </button>
                  ) : (
                    <div className="container m-auto Loading_page">
                      <Loading />
                    </div>
                  )}

                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && (
                    <p style={{ color: "green" }}>Subscription successful!</p>
                  )}
                  {isActive ? (
                    <div>
                      <p>
                        subscription active until:{" "}
                        {new Date(expiryDate * 1000).toLocaleString()}{" "}
                      </p>
                      <button
                        className="buy_song_btn"
                        onClick={() =>
                          buyNFT(nftData.price.toString(), nftData.tokenId)
                        }
                        disabled={isPurchasing}
                      >
                        {isPurchasing ? "Loading" : "Buy Song"}
                      </button>
                    </div>
                  ) : (
                    <p className="m-6">You must subscribe to purchase this song.</p>
                  )}
                  {/* {isActive ? (
                    <button
                      className="buy_song_btn"
                      onClick={() =>
                        buyNFT(nftData.price.toString(), nftData.tokenId)
                      }
                      disabled={isPurchasing}
                    >
                      {isPurchasing ? "Loading" : "Buy Song"}
                    </button>
                  ) : null} */}
                </div>
              ) : (
                <div className="connect_id_wallet">
                  <h5>Connect Wallet To Continue</h5> <ConnectButton />
                </div>
              )}
            </div>
          )}
        </NftInfo>
      )}
    </div>
  );
}
