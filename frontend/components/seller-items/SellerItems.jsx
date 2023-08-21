import React, { useState, useEffect } from "react";
import { Contract, providers, utils } from "ethers";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../../constants/index";
import axios from "axios";
import Loading from "../Loading";
import { useSigner, useProvider } from "wagmi";
import { useRouter } from "next/router";
import { useAccount, useBalance } from "wagmi";
import Play from "../../components/music/SellerSongs/Play";
export default function SellerItems() {
  const router = useRouter();
  const [allNFTs, setAllNFTs] = useState([]);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [soldNFTs, setSoldNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allNFTxs, setAllNFTxs] = useState([]);

  //wagmi signer & provider
  const { data: signer } = useSigner({
    onError(error) {
      console.log("Error", error);
    },
  });
  // const signer = useSigner();

  const provider = useProvider();

  // const provider = useProvider();

  useEffect(() => {
    if (!signer) return;
    loadMyNFTsx();
  }, [signer]);
  // Only loads the NFTs which are purchased by the user.
  const loadMyNFTsx = async () => {
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
        };
        return item;
      })
    );
    setAllNFTxs(allItems);
    setLoading(false);
  };

  useEffect(() => {
    if (!signer) return;
    loadMyNFTs();
  }, [signer]);
  // Loads all the nfts which are either listed or sold of user.
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
    const data = await nftMarketPlaceContract.getSellerListedItems();

    const allItems = await Promise.all(
      data?.map(async (i) => {
        let convertedPrice = utils.formatUnits(i.price.toString(), "ether");
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const metaData = await axios.get(tokenUri);
        let item = {
          price: convertedPrice,
          sold: i.sold,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: metaData.data.image,
          name: metaData.data.name,
          description: metaData.data.description,
        };
        return item;
      })
    );

    // Filter to get only listed NFTs
    let currentListedItems = allItems.filter((item) => !item.sold);
    setListedNFTs(currentListedItems);

    // Filter to get only sold NFTs
    let soldItems = allItems.filter((item) => item.sold);
    setSoldNFTs(soldItems);

    setLoading(false);
  };

  //load address
  const { address } = useAccount();

  return (
    <div className="container">
      {!listedNFTs.length && loading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <div className="rowx ">
              {listedNFTs.length && !loading ? (
                listedNFTs?.map((nft, index) => (
                  <div key={index}>
                    <div
                      className="col45 nft-img gradient-box "
                      key={`post-${nft.id}`}
                      onClick={() => {
                        // buyNFT(nft);
                        router.push(`/profile/${nft.tokenId}`);
                      }}
                    >
                      <div className=" gradient-box epic-img nft_home_img_width">
                        <img src={nft.image} alt="img" />
                      </div>

                      <h3>
                        <span>#{nft.tokenId} </span> {nft.name}
                      </h3>
                      {/* button */}
                      <div className="epic-box">
                        <div className="epic">
                        </div>
                        <div>{/* <p className="rating"> 18/90</p> */}</div>
                      </div>
                      {/* eth */}
                      <div className="eth-sale">
                        <div>{nft.price} FTM</div>
                      </div>
                    </div>{" "}
                  </div>
                ))
              ) : (
                <div className=" No_Listed_NFTs">
                  <h2>No Listed NFTs Songs found </h2>{" "}
                  <span>
                    <button
                      text="List Now"
                      className="purchase_btn"
                      onClick={() => router.push("/sell")}
                    >
                      List Now
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sold list */}
          <div className="sold_nfts">
            <hr />
            <header>Songs Sold </header>
            <div className="">
              {soldNFTs.length && !loading ? (
                soldNFTs?.map((nft, index) => (
                  <div key={index}>
                    <div key={index}>
                      <div
                        className="col45 nft-img gradient-box "
                        key={`post-${nft.id}`}
                      >
                        <div className=" gradient-box epic-img nft_home_img_width">
                          <img src={nft.image} alt="img" />
                        </div>

                        <h3>{nft.name}</h3>
                        {/* button */}
                        <div className="epic-box">
                          <div className="epic"></div>
                          <div>{/* <p className="rating"> 18/90</p> */}</div>
                        </div>
                        {/* eth */}
                        <div className="eth-sale">
                          <div>{nft.price} FTM</div>
                        </div>
                      </div>{" "}
                    </div>
                    <Play />
                  </div>
                ))
              ) : (
                <div className="No_NFTs_sold">No Songs sold yet</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* {!listedNFTs.length && loading ? (
        <Loading />
      ) : (
       
      )} */}
    </div>
  );
}
