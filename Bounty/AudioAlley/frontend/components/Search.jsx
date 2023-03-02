import React, { useState, useEffect } from "react";
import { create } from "ipfs-http-client";
import { providers, Contract, utils } from "ethers";
import axios from "axios";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../constants/index";
import { useRouter } from "next/router";
import { useSigner, useProvider } from "wagmi";
import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadMyNFTs();
  }, []);
  const loadMyNFTs = async () => {
    setLoading(true);

    const provider = new providers.JsonRpcProvider(
      "https://rpc.ankr.com/fantom_testnet"
    );

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );
    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider
    );

    const data = await nftMarketPlaceContract.getAllListedItems();

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

    setAllNFTs(items);
    setLoading(false);
  };

  useEffect(() => {
    // Filter the allNFTs array based on search term
    const filteredNFTs = allNFTs.filter((nft) => {
      const nameMatches = nft?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const artistMatches =
        nft.artistName &&
        nft.artistName.toLowerCase().includes(searchTerm.toLowerCase()); // Check that nft.artist is defined
      return nameMatches || artistMatches; // Filter based on name or artist name property
    });

    setFilteredNFTs(filteredNFTs);
  }, [searchTerm, allNFTs]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or artist name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!filteredNFTs.length && loading ? (
        <Loading />
      ) : (
        <div className="my_nft_box nft-mg">
          {filteredNFTs.length && !loading ? (
            filteredNFTs?.map((nft, index) => (
              <div key={index} className="search_result">
                <a href={`/${nft.itemId}`} >
                  <div
                    className="search_result_flex"
                    // onClick={() => {
                    //   router.push(`/${nft.itemId}`);
                    // }}
                  >
                    <Image
                      src={nft.image}
                      width="20"
                      height={"20"}
                      alt={nft.name}
                    />
                    <h1>{nft.artistName}</h1>
                    <h1>{nft.name}</h1>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="eth-sale No_purchase_History">
              No purchase History found.
              <br />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
