import React from "react";
import { useEffect, useState } from "react";
import { Contract, providers, utils } from "ethers";
import axios from "axios";
import PolygonImg from "../../public/assets/polygon.png";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../../constants/index";
import { useAccount, useConnect, useSigner } from "wagmi";
import Image from "next/image";

export const FavouriteNFTs = () => {
  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [loadingState, setLoadingState] = useState("not-loaded");

  const connectWallet = () => {
    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };
  useEffect(() => {
    loadNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      data?.map(async (i) => {
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
    setLoadingState("loaded");
  }
  const favNft = nfts[2 || 5];

  if (favNft != undefined) {
    // console.log(favNft.price);
  }

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true);

    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let convertedPrice = utils.parseUnits(price.toString(), "ether");

    const transaction = await nftMarketPlaceContract.buyItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      {
        value: convertedPrice,
      }
    );
    loadNFTs();
    await transaction.wait();
    await router.push("/my-items");
    setIsPurchasing(false);
  };
  // const usd = favNft.price * favNft.price;

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
        // console.log(response.data);
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(usdPrice.matic-network.usd)
  }, []);
  const favNfts = nfts[3];

  if (favNfts != undefined) {
    const UsdPrice = usdPrice["matic-network"].usd * 3;

    console.log(UsdPrice);
  }

  // console.log(usdPrice.matic-network.usd)

  return (
    <>
      <div className="second-section">
        <div className=" container" id="Explore" data-aos="zoom-in">
          <div className="row">
            <div className="col50 fav">
              <h1>
                Choose Your Favorite <br />
                Art. If you want!
              </h1>
            </div>
         
          </div>
          <div className="rowX nft-m">
            <div>
              <div className="gradient-box col50  ">
                <div className="meta-nft col50">
                  <img
                    src="https://img.freepik.com/free-psd/book-hardcover-mockup_125540-382.jpg?w=740&t=st=1676801357~exp=1676801957~hmac=2ad0d268ebc7a178cb11511c392cdbd199008fa4fda911c4adee3b5368c4c50d"
                    alt="Nft Image"
                  />
                </div>
                <div className="meta-text col50">
                  <p>{favNft?.name}</p>
                  <h3>ID #{favNft?.tokenId}</h3>

                  <p>
                    <img src={PolygonImg.src} className="polygon" />
                    {Number(favNft?.price).toFixed(3)} MATIC
                  </p>

                  <p className="nft_price_in_usd">
                    <span>
                      {" "}
                      {usdPrice && favNft
                        ? Number(usdPrice["matic-network"].usd).toFixed(2) *
                          Number(favNft.price).toFixed(2)
                        : null}{" "}
                      USD{" "}
                    </span>
                  </p>

                  {!isConnected ? (
                    <button
                      text="List NFT"
                      className="btn_submit_nft"
                      onClick={connectWallet}
                    >
                      Buy
                    </button>
                  ) : (
                    <button
                      className="marketplace_btn_buy"
                      onClick={() =>
                        buyNFT(favNft?.price.toString(), favNft.tokenId)
                      }
                    >
                      Buy
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col50">
              <h2>
                Begin with the simplest and most secure stage to purchase <br />
                and exchange advanced workmanship and NFTs
              </h2>
              Penpal books apires to recognize and reflect diverse voices by
              taking penpal stories to published book and unto bookshelves
              around the world. Penpal books works with ......
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
