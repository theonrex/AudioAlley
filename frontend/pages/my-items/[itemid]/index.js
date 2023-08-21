import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
} from "../../../constants/index";
import axios from "axios";
import { useRouter } from "next/router";
import NftInfo from "../../../components/nft-info/NftInfo";
import { useSigner } from "wagmi";
import Loading from "../../../components/Loading";

export default function Itemid() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [resellPrice, setResellPrice] = useState("");
  const [isReselling, setIsReselling] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
  });
  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(true);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/fantom_testnet"
    );
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

    const allData = async () => {
      let convertedPrice = ethers.utils.formatUnits(
        data.price.toString(),
        "ether"
      );
      const tokenUri = await nftContract.tokenURI(data.tokenId);
      const metaData = await axios.get(tokenUri);
      let item = {
        price: convertedPrice,
        tokenId: data.tokenId.toNumber(),
        seller: data.seller,
        owner: data.owner,
        image: metaData.data.image,
        name: metaData.data.name,
        description: metaData.data.description,
        artistName: metaData?.data?.artistName,
        fileUrl: metaData.data.file,
        file: metaData.data.file,
      };
      // console.log(item);
      setNftData(item);
    };
    allData();
    setLoading(false);
    setIsPurchasing(false);
  };

  const [formInput, updateFormInput] = useState({ price: "", image: "" });

  const resellNFT = async (price, tokenId) => {
    let convertedPrice = ethers.utils.parseUnits(formData.price, "ether");
    const nftMarketPlaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );
    let listingPrice = await nftMarketPlaceContract.getListingPrice();
    listingPrice = await listingPrice.toString();
    // tokenId.toNumber();

    let transaction = await nftMarketPlaceContract.resellItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      convertedPrice,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    await router.push("/marketplace");
  };
  useEffect(() => {
    const load = async () => {
      if (router.query.itemid) await loadNFT();
    };
    load();
  }, [itemid]);


  return (
    <div className="sell_song">
      {!nftData && loading ? (
        <Loading />
      ) : (
        <NftInfo nftData={nftData}>
          <button
            className="purchase-btn"
            onClick={() => setIsReselling(!isReselling)}
          >
            {isReselling ? "Cancel" : "Re-sell NFT"}
          </button>
          {isReselling && (
            <div>
              <input
                id="resellprice"
                placeholder="e.g.10 (In FTM)"
                label="Resell Price"
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  // console.log(formData);
                }}
              />
              <br />
              <button
                text="Buy Now"
                className="purchase-btn"
                onClick={() =>
                  resellNFT(nftData.price.toString(), nftData.tokenId)
                }
                disabled={isPurchasing}
              >
                List Item
              </button>
            </div>
          )}
        </NftInfo>
      )}
    </div>
  );
}
