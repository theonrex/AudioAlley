import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useSigner, useAccount, useBalance } from "wagmi";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../../components/nft-info/NftInfo";
import Loading from "../../components/Loading";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ABI,
} from "../../constants/index";

export default function Itemid() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const ankrTestnet = "https://rpc.ankr.com/fantom_testnet";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
      const { address } = useAccount();

  //wagmi si  const [error, setError] = useState("");
  const { data: signer, isError, isLoading } = useSigner();
  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(true);
    
    const user = address

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
    const sub = await nftMarketPlaceContract.getSubscriptionPrice();
    const convertSub = ethers.utils.formatUnits(sub.toString(), "ether");
    console.log(convertSub);
    const allData = async () => {
      let convertedPrice = ethers.utils.formatUnits(
        data.price.toString(),
        "ether"
      );
      const tokenUri = await nftContract.tokenURI(data.tokenId);
      const metaData = await axios.get(tokenUri);

      let item = {
        user: user,
        subscriptionPrice: convertSub,
        price: convertedPrice,
        tokenId: data.tokenId.toNumber(),
        seller: data.seller,
        owner: data.owner,
        image: metaData?.data?.image,
        name: metaData.data?.name,
        description: metaData.data.description,
      };
      console.log(item);
      setNftData(item);
    };
    allData();
    setLoading(false);
    setIsPurchasing(false);
  };

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

    try {
      // Create provider and signer
      const provider = new ethers.providers.JsonRpcProvider(ankrTestnet);
      // const user = await signer.getAddress();

      // Create PENPAL contract instance
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

      // Subscribe to PENPAL contract
      const tx = await contract.subscribe(user, {
        value: convertedPrice,
      });
      await tx.wait();
      setSuccess(true);
      console.log(convertedPrice);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      {!nftData && loading ? (
        <Loading />
      ) : (
        <NftInfo nftData={nftData}>
          {data < nftData?.price ? (
            "insufficient amount for this transaction"
          ) : (
            <div>
              <button
                onClick={() =>
                  subscribe(nftData.subscriptionPrice.toString(), nftData.user)
                }
                disabled={loading}
              >
                {loading ? "Loading..." : "Subscribe for 0.03 ETH"}
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && (
                <p style={{ color: "green" }}>Subscription successful!</p>
              )}
              <button
                text="Buy Now"
                icon={<AiOutlineArrowRight className="text-2xl" />}
                className="nft_id_buy_btn"
                onClick={() =>
                  buyNFT(nftData.price.toString(), nftData.tokenId)
                }
                disabled={isPurchasing}
              >
                Buy Item
              </button>
            </div>
          )}
        </NftInfo>
      )}
    </div>
  );
}
