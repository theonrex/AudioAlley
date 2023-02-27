import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_CONTRACT_ABI,
} from "../../constants/index";
import { Contract, providers, utils } from "ethers";
import axios from "axios";

export default function NftInfo({ nftData, children }) {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new providers.JsonRpcProvider(
      "https://rpc.testnet.fantom.network"
    );

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );
    const contract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider
    );
    const data = await contract.getAllListedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    console.log(items);

    setLoadingState("loaded");
  }




  



  //import polygon current pricr from coingecko

  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd",
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(usdPrice.matic-network.usd)
  }, []);
  const favNfts = nfts;

  if (favNfts != undefined) {
    const UsdPrice = usdPrice
      ? ["matic-network"].usd * nfts.price
      : console.log(nfts.price);
  }
  return (
    <MainLayout>
      {!nftData ? (
        <hr />
      ) : (
        <div className="rowx container nft_info_id">
          <header>
            Nft <span>Details</span>
          </header>
          <div className="col50 nftinfoId">
            <img className=" py-5 mx-auto" src={nftData?.image} />
          </div>
          <div className="col50 nft_details_ID">
            <div className="nft_details_ID">
              <h1 className="text-6xl ">{nftData?.name}</h1>
              <p className="text-gray-600"></p>

              <p className="text-gray-600">
                {" "}
                <span>Description:</span> {nftData?.description}
              </p>
              <hr />

              {/* <h5>
                <span className="Owned_by">
                  Owned by <br />{" "}
                </span>{" "}
                {nftData.owner == "0x0000000000000000000000000000000000000000"
                  ? nftData.seller.toString()
                  : nftData.seller.toString()}
              </h5> */}
              {/* <h5>
                <a href='https://testnets.opensea.io/assets/mumbai/0x7ea9bdfef45683e69b611376c717ad8319ec0710/2'> Opensea Link</a>
              
              
              </h5> */}
              <div className="current_price_id">
                <div className="nft_tag">
                  <img src="https://img.icons8.com/3d-fluency/94/null/price-tag-usd.png" />{" "}
                  | Price may be updated by the owner
                </div>
                <hr />
                <p className="">Current price</p>{" "}
                <p className="nft_info_price_id">
                  <>{nftData?.price.toString()}</> Matic
                  <span>
                    {" "}
                    $
                    {usdPrice && nftData
                      ? Number(usdPrice["matic-network"].usd).toFixed(32) *
                        Number(nftData.price).toFixed(32)
                      : null}{" "}
                    USD{" "}
                  </span>
                </p>
              </div>
            </div>

            <div>{children}</div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
