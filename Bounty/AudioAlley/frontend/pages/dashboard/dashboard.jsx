import React, { useEffect, useState } from "react";
import { Contract, utils } from "ethers";
import axios from "axios";
import { useRouter } from "next/router";
import {
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_MARKETPLACE_ADDRESS,
} from "../../constants";
import { useSigner } from "wagmi";
export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();

  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  useEffect(() => {
    loadNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function loadNFTs() {
    const nftCOntract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );
    const marketplaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );
    const data = await marketplaceContract.getOwnerListedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await nftCOntract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenURI);
        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          name: meta.data.name,
          image: meta.data.image,
          description: meta.data.description,
          tokenURI,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  console.log(nfts);
  function listNFT(nft) {
    console.log("nft:", nft);
    router.push(
      `/dashboard/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
    );
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="no_my_nfts">No NFTs owned</h1>;
  return (
    <div className="container">
      <div className="rowx nft-mg">
        <div className="">
          {nfts.map((nft, i) => (
            <div
              key={i}
              className="col29 nft-img gradient-box gradient-box epic-img nft_home_img_width"
            >
              <img src={nft.image} alt="nft image" />
              <div className="my_nfts_text">
                <p>Name: {nft.name}</p>
                <p className="">Price - {nft.price} Eth</p>
                <button className="mynfts_btn " onClick={() => listNFT(nft)}>
                  List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
