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
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new providers.Web3Provider(connection);
    // const signer = provider.useSigner();

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
    console.log(allNFTxs);
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
    console.log("This is your data ", data);

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
        console.log(item);
        return item;
      })
    );

    // Filter to get only listed NFTs
    let currentListedItems = allItems.filter((item) => !item.sold);
    setListedNFTs(currentListedItems);

    // Filter to get only sold NFTs
    let soldItems = allItems.filter((item) => item.sold);
    setSoldNFTs(soldItems);
    console.log(soldItems);
    console.log(currentListedItems);
    setLoading(false);
  };

  //load address
  const { address } = useAccount();

  // useEffect(() => {
  //   const load = async () => {
  //     await loadMyNFTs();
  //     console.log(listedNFTs);
  //   };
  //   load();
  // }, []);
  return (
    <div className="container">
      {!listedNFTs.length && loading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <div className="rowx">
              {listedNFTs.length && !loading ? (
                listedNFTs?.map((nft, index) => (
                  <div key={index}>
                    <div
                      className="col29 nft-img gradient-box "
                      key={`post-${nft.id}`}
                      onClick={() => {
                        // buyNFT(nft);
                        router.push(`/profile/${nft.tokenId}`);
                        console.log("Onclicked on buy button.");
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
                        
                          <img src={nft.image} alt="img" />
                        </div>
                        <div>{/* <p className="rating"> 18/90</p> */}</div>
                      </div>
                      {/* eth */}
                      <div className="eth-sale">
                        <div>
                          <img src="data:image/png;base64,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" />{" "}
                          {nft.price} MATIC
                        </div>
                        <div
                          className="eth-sale-icon"
                          onClick={() =>
                            alert("Feature Not Activated. Try Later ")
                          }
                        >
                          <a className="nav-link-svg " href="/#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-cart3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                ))
              ) : (
                <div className=" No_Listed_NFTs">
                  No Listed NFTs found{" "}
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
            <header> Sold NFTs </header>
            <div className="grid grid-cols-3">
              {soldNFTs.length && !loading ? (
                soldNFTs?.map((nft, index) => (
                  <div key={index}>
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
                          <span>#{nft.tokenId} </span> {nft.name}
                        </h3>
                        {/* button */}
                        <div className="epic-box">
                          <div className="epic">
                            <button
                              nft={nft}
                              className="purchase_btn"
                              url="/my-items/"
                            >
                              Buy Nft
                            </button>
                            <img src={nft.image} alt="img" />
                          </div>
                          <div>{/* <p className="rating"> 18/90</p> */}</div>
                        </div>
                        {/* eth */}
                        <div className="eth-sale">
                          <div>
                            <img src="data:image/png;base64,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" />{" "}
                            {nft.price} MATIC
                          </div>
                          <div
                            className="eth-sale-icon"
                            onClick={() =>
                              alert("Feature Not Activated. Try Later ")
                            }
                          >
                            <a className="nav-link-svg " href="/#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-cart3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                ))
              ) : (
                <div className="No_NFTs_sold">No NFTs sold yet</div>
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
