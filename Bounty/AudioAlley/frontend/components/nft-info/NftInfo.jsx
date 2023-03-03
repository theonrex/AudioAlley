import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState, useRef } from "react";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
} from "../../constants/index";
import { Contract, providers, utils } from "ethers";
import axios from "axios";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const ReactJkMusicPlayer = dynamic(() => import("react-jinke-music-player"), {
  ssr: false,
});

export default function NftInfo({ nftData, children }) {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [songs, setSongs] = useState([]);

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
          artistName: meta.data.artistName,
          fileUrl: meta.data.file,
          songData: meta.data.songData,
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
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  
  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd",
    };

    axios
      .request(options)
      .then((response) => {
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const favNfts = nfts;

  if (favNfts != undefined) {
    const UsdPrice = usdPrice
      ? ["fantom"].usd * nfts.price
      : null;
  }

  const audioList1 = [
    {
      name: nftData?.artistName,
      singer: nftData?.name,
      cover: nftData?.image,
      musicSrc: nftData?.file,
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
  if (loadingState === "not-loaded") {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      {!nftData ? (
        <hr />
      ) : (
        <div className="container">
          {loadingState === "loaded" && (
            <ReactJkMusicPlayer
              audioLists={audioList1}
              {...params}
              getAudioInstance={handleGetAudioInstance}
              onClickAudioList={(item, index) => handleSongClick(index)}
            />
          )}
          <div className=" rowx nft_info_id">
            <header>
              Song <span>Details</span>
            </header>
            <div className="col50 nftinfoId">
              <img className=" py-5 mx-auto" src={nftData?.image} />
            </div>
            <div className="col50 nft_details_ID">
              <div className="nft_details_ID">
                <h1 className=" ">{nftData?.name}</h1>
                <p></p>
                <p> {nftData?.description}</p>
                <p className="nft_info_price_id">
                  <>{nftData?.price.toString()}</> FTM
                  <span>
                    {" "}
                    $
                    {usdPrice && nftData
                      ? Number(usdPrice["fantom"].usd).toFixed(32) *
                        Number(nftData.price).toFixed(32)
                      : null}{" "}
                    USD{" "}
                  </span>
                </p>
                <hr />
              </div>
              <div>{children}</div>
            </div>
          </div>
          <div className="current_price_id">
            {nftData.songData ? (
              <ReactQuill
                theme={null}
                value={nftData.songData}
                // onChange={content}
                readOnly={true}
              />
            ) : (
              `Lyrics not available`
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
