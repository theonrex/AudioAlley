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
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../../../components/nft-info/NftInfo";
import { useSigner } from "wagmi";
import Loading from "../../../components/Loading";
import { useAccount, useBalance } from "wagmi";

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
      "https://rpc.testnet.fantom.network"
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
      };
      console.log(item);
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

  const AccountBalance = () => {
    const { address } = useAccount();
    const { data, refetch } = useBalance({
      address,
      watch: true,
    });
    return (
      <div className=" container-xxl">
        {data?.formatted == 0 ? (
          <a href="https://mumbaifaucet.com/" target="_blank" rel="noreferrer">
            {" "}
            Get free testnet polygon{" "}
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACtUlEQVRYhe3YPYgVZxTG8TPLyiJr0CgkaKOoRRK2NEogSWcjWiiKBMEmRCEfWGolKcSkUQmkkcQPbEQRlAXBwLZqyIekCBiCxSIkBhJJWBTF/fhZzGx4d3zveG9y727hfarLnfOc85/3zJx3ZiL66quv7ggD2INT2LHQPHOEN3HDXH2LTQsNtgrnMCOv6er4q/MNthgHMdECrK4H+BRD8wG3C+MZiHv4AGvxEf7MxPyKrb2E258p+hif46Va7DKcwJOMZ3evAC/XCl3Fuud4XsNYzXemV4CjSZEbGGjTN4ifEu+5bjE1AXxXFMVMO0mKopiKiO+7gzRXTYA6zDUbPxERl+YcYKVywP+B81jTYe5/E6UtPtGh9zC+ksxEDOGQZ8fVIxzB8LwBZnJtw53MHZ7qN+xrutbbugk6BBvBWESMRkQ6AaYj4nZETCX/rYqIkxFxHRvbSZ6u4IUOwVbgS0xmVuoK1ldxq3EhEzODs41trwFO4cOm5a88g/gE9zNFf8bmFr53cSvjOdZU7FjG8CPeaRG/uYKo634FPfickxvAx9VizGq0yTBcLXP96WVG2ZbVVdx6ZdvqmlS2eUUTWKZu2vLWgIlhI262ALhdO+NZjWGkE7Ck3vGOACtTofWTTaq72PtfwP4XYGIeVg7VRzWwCeUQHkpiX8FJHJ03wCTJGuU2dU+5ba2sHd+Kf6oip7sF2HiXpSqKYjwi3msI2RERS2fDOwFsiu/6TlJpAxa1E6icsy1fvroJOJ38HomIb/BGk0H5MDwaEW+1yNM9Yadn5+ckvsDLtdgl+Ez5OlHXvp4AVoW34JdM0b+UO8s6vI/fMzHj2NUzuARyEQ7g7wxETg+VL2VLeg5XA11etTe361BeDhdV2+eCCa/jWg3uB7y9oGB1YTu+Vn6A6tV466uvF09PAYl4Qi/9sg+nAAAAAElFTkSuQmCC"
              alt="polygon logo"
            />
          </a>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      {!nftData && loading ? (
        <Loading />
      ) : (
        <NftInfo nftData={nftData}>
          <button
            icon={<AiOutlineArrowRight className="text-2xl" />}
            className="purchase-btn"
            onClick={() => setIsReselling(!isReselling)}
          >
            {isReselling ? "Cancel" : "Re-sell NFT"}
          </button>
          {isReselling && (
            <div>
              <input
                id="resellprice"
                placeholder="e.g.10 (In Polygon)"
                label="Resell Price"
                onChange={(e) => {
                  console.log(formData.price);
                  setFormData({ ...formData, price: e.target.value });
                  console.log(formData);
                }}
              />
              <br />
              <button
                text="Buy Now"
                icon={<AiOutlineArrowRight className="text-2xl" />}
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
