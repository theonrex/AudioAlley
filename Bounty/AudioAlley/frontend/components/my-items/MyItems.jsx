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
          supply: metaData.data.supply,
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
    setAllNFTs(allItems);
    console.log(allItems);
    setLoading(false);
  };

  return (
    <div>
      {!allNFTs.length && loading ? (
        <Loading />
      ) : (
        <div className="my_nft_box">
          {allNFTs.length && !loading ? (
            allNFTs?.map((nft, index) => (
              <div key={index}>
                <div
                  className="col29 nft-img gradient-box "
                  key={`post-${nft.id}`}
                  onClick={() => {
                    // buyNFT(nft);
                    router.push(`/my-items/${nft.tokenId}`);
                    console.log("Onclicked on buy button.");
                  }}
                >
                  <div className=" gradient-box epic-img nft_home_img_width">
                    <img src={nft.image} alt="img" />
                  </div>

                  <h3>
                    <span>Name: </span> {nft.name}
                  </h3>
                  {/* button */}
                  <div className="epic-box">
                    <div className="epic">
                      <button
                        nft={nft}
                        className="purchase-btn"
                        url="/my-items/"
                        // onClick={() => buyNFT(nft)}
                      >
                        {" "}
                        List
                      </button>
                      <img src={nft.image} alt="img" />
                    </div>
                    <div>{/* <p className="rating"> 18/90</p> */}</div>
                  </div>
                  {/* eth */}
                  <div className="eth-sale">
                    <div>
                      {/* <img
                        alt="svgImg"
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGc+PHBhdGggZD0iTTM5LjQxNjY3LDg2bDUwLjE2NjY3LC03OC44MzMzM2w1MC4xNjY2Nyw3OC44MzMzM2wtNTAuMTY2NjcsMjguNjY2Njd6IiBmaWxsPSIjMzhmZjA2Ij48L3BhdGg+PHBhdGggZD0iTTg5LjU4MzMzLDcuMTY2NjdsNTAuMTY2NjcsNzguODMzMzNsLTUwLjE2NjY3LDI4LjY2NjY3eiIgZmlsbD0iIzQ2Y2MyZSI+PC9wYXRoPjxwYXRoIGQ9Ik0zOS40MTY2Nyw5Ni43NWw1MC4xNjY2NywyOC42NjY2N2w1MC4xNjY2NywtMjguNjY2NjdsLTUwLjE2NjY3LDY4LjA4MzMzeiIgZmlsbD0iIzM4ZmYwNiI+PC9wYXRoPjxwYXRoIGQ9Ik04OS41ODMzMywxMjUuNDE2NjdsNTAuMTY2NjcsLTI4LjY2NjY3bC01MC4xNjY2Nyw2OC4wODMzM3pNMzkuNDE2NjcsODZsNTAuMTY2NjcsLTIxLjVsNTAuMTY2NjcsMjEuNWwtNTAuMTY2NjcsMjguNjY2Njd6IiBmaWxsPSIjNDZjYzJlIj48L3BhdGg+PHBhdGggZD0iTTg5LjU4MzMzLDY0LjVsNTAuMTY2NjcsMjEuNWwtNTAuMTY2NjcsMjguNjY2Njd6IiBmaWxsPSIjMDJmZjJiIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      />{" "} */}
                      {nft.price} MATIC
                    </div>
                  </div>
                </div>{" "}
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
