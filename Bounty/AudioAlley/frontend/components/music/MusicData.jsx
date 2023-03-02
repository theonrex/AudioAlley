import { Contract, providers, utils } from "ethers";
import axios from "axios";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../../constants/index";

export async function MusicData() {
  const ftmTestnet = "https://rpc.testnet.fantom.network";
  const ankrTestnet = "https://rpc.ankr.com/fantom_testnet";

  /* create a generic provider and query for unsold market items */
  const provider = new providers.JsonRpcProvider(ankrTestnet);

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

  try {
    const items = await Promise.all(
      data?.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i?.tokenId);
        const meta = await axios.get(tokenUri);
        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toString(),
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          file: meta.data.file,
          name: meta.data.name,
          artistName: meta?.data?.artistName,

          description: meta.data.description,
          category: meta.data.category,
          storyData: meta.data.storyData,
          rating: meta.data.rating,
        };

        // Check if the user owns the NFT
        const isOwner = await contract.getOwnerListedItems();
        if (isOwner) {
          item.fileUrl = meta.data.file;
        } else {
          // Set fileUrl to null to indicate that the file is not available
          item.fileUrl = null;
        }
        return item;
      })
    );
    return items;
  } catch (error) {
    console.log("something went wrong ", error);
  }
}
