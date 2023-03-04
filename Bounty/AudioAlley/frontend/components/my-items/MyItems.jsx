import React, { useState, useEffect } from "react";
import { Contract, providers, utils } from "ethers";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../../constants/index";
import axios from "axios";
import Link from "next/link";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { useSigner, useProvider } from "wagmi";
import Play from "../music/mysongs/Play"
export default function MyItems() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //wagmi signer & provider
  const { data: signer } = useSigner({
    onError(error) {
      console.log("Error", error);
    },
  });
  // const signer = useSigner();

  const provider = useProvider();

  // Only loads the NFTs which are purchased by the user.

  useEffect(() => {
    if (!signer) return;
    loadMyNFTs();
  }, [signer]);

  const loadMyNFTs = async () => {
    setLoading(true);

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );
    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    const data = await nftMarketPlaceContract.getOwnerListedItems();

    const allItems = await Promise.all(
      data?.map(async (i) => {
        let convertedPrice = utils.formatUnits(i.price.toString(), "ether");
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const metaData = await axios.get(tokenUri);
        let item = {
          price: convertedPrice,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: metaData.data.image,
          name: metaData.data.name,
          description: metaData.data.description,
          artistName: metaData.data.artistName,
        };
        return item;
      })
    );
    setAllNFTs(allItems);
    setLoading(false);
  };
console.log(allNFTs)
  return (
    <div>
      {!allNFTs.length && loading ? (
        <Loading />
      ) : (
        <div className="my_nft_box nft-mg">
          {allNFTs.length && !loading ? (
            allNFTs?.map((nft, index) => (
              <div key={index}>
                <div
                  className="col29 homepage_market "
                  key={`post-${nft.id}`}
                  onClick={() => {
                    // buyNFT(nft);
                    router.push(`/my-items/${nft.tokenId}`);
                  }}
                >
                  <div className=" epic-img nft_home_img_width">
                    <img src={nft.image} alt="img" />
                  </div>
                  <h3>
                    Title:
                    <span>{nft.name} </span>
                  </h3>{" "}
                  <h3>
                    Artist Name:
                    <span>{nft?.artistName}</span>
                  </h3>
                  {/* button */}
                  <div className="eth-sale">
                    <h3>
                      Price
                      <span>{nft.price} FTM</span>
                    </h3>
                  </div>
                  <div className="epic-box">
                    <div className="epic">
                      <button
                        nft={nft}
                        className="btn_fav_song_nft"
                        url="/my-items/"
                        // onClick={() => buyNFT(nft)}
                      >
                        {" "}
                        List
                      </button>
                    </div>
                  </div>
                </div>
                <Play/>
              </div>
            ))
          ) : (
            <div className="eth-sale No_purchase_History">
              No purchase History found.
              <br />
              <Link href="/marketplace">Buy Now some</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
