import React from "react";
import { useEffect, useState } from "react";
import { Contract, providers, utils } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { useSigner } from "wagmi";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import {
  NFT_MARKETPLACE_ABI,
  NFT_MARKETPLACE_ADDRESS,
} from "../../constants/index";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";

export default function ResellNFT() {
  const [formInput, updateFormInput] = useState({ price: "", image: "" });
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const { image, price } = formInput;
  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  useEffect(() => {
    fetchNFT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  async function fetchNFT() {
    if (!tokenURI) return;
    const meta = await axios.get(tokenURI);
    updateFormInput((state) => ({ ...state, image: meta.data.image }));
  }

  const listNFTForSale = async (price, tokenId) => {
    if (!price) return;

    let priceFormatted = utils.parseUnits(formInput.price, "ether");
    let contract = new Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );
    let listingPrice = await contract.getListingPrice();

    listingPrice = listingPrice.toString();
    let transaction = await contract.resellItem(tokenId, priceFormatted, {
      value: listingPrice,
    });
    await transaction.wait();

    router.push("/");
  };

  return (
    <div className=" container ">
      <div className="rowx">
        <div className="col50 resell_nft">
          <header>Sell Your NFTs</header>

          <input
            placeholder="Asset Price in MATIC"
            className="resel_nft_input"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          <button
            onClick={() => listNFTForSale(price.toString(), tokenId)}
            className="resell_btn"
          >
            List NFT
          </button>
        </div>

        <div className="col50 resel_nft_image">
          {image && (
            <img
              className="rounded mt-4"
              width="350"
              src={image}
              alt="resell image"
            />
          )}
        </div>
      </div>
    </div>
  );
}
