import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  NFT_CONTRACT_ABI,
} from "../../constants/index";
import { useAccount, useSigner } from "wagmi";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const projectId = "";
const projectSecret = "";
const projectIdAndSecret = `${projectId}:${projectSecret}`;
const client = create({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

export default function ListItem() {
  const router = useRouter();
  const [isListing, setisListing] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [step, setStep] = useState(1);
  const [storyData, setStoryData] = useState("");

  const [formData, setFormData] = useState({
    price: "",
    name: "",
    category: "",
    rating: "",
    description: "",
    supply: "",
  });

  // Add event listeners to update form data state
  const handleNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };
  const handlePenpaltextarea = (value) => {
    setStoryData(value);
  };

  const handleDescriptionChange = (event) => {
    setFormData({ ...formData, description: event.target.value });
  };

  const handlePriceChange = (event) => {
    setFormData({ ...formData, price: event.target.value });
  };
  const handleFileChange = (value) => {
    setFile(value);
  };
  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };
  const handleRatingChange = (event) => {
    setFormData({ ...formData, rating: event.target.value });
  };

  const handleSuppyChange = (event) => {
    setFormData({ ...formData, supply: event.target.value });
  };

  // On mount, check if there is saved form data in localStorage
  useEffect(() => {
    // Load the storyData value from local storage when the component mounts
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setStoryData(savedData);
    }
  }, []);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    const savedFileData = localStorage.getItem("formData");
    if (savedFileData) {
      setFormData(JSON.parse(savedFileData));
    }
  }, []);

  // useEffect(() => {
  //   const savedStoryData = localStorage.getItem("storyData");
  //   if (savedStoryData) {
  //     setStoryData(JSON.parse(savedStoryData));
  //   }
  //   console.log(savedStoryData);
  // }, []);

  console.log(storyData);

  useEffect(() => {
    // Load the storyData value from local storage when the component mounts
    const savedData = localStorage.getItem("storyData");
    if (savedData) {
      setStoryData(savedData);
    }
  }, []);

  // On form submission, clear form data from localStorage
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("formData");
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      rating: "",
      supply: "",
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // On form cancellation, clear form data from localStorage
  // const handleCancel = () => {
  //   localStorage.removeItem("formData");
  //   setFormData({ name: ""});
  // };

  // Save form data to localStorage on each change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    // Save the storyData value to local storage whenever it changes
    localStorage.setItem("storyData", storyData);
  }, [storyData]);

  //wagmi signer
  const { data: signer } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  // Onchange of file
  const onChange = async (e) => {
    const fileData = e.target.files[0];
    try {
      const add = await client.add(fileData, {
        progress: (prog) => console.log("file is uploaded : ", prog),
      });
      const url = `https://theonnfts.infura-ipfs.io/ipfs/${add.path}`;
      setFile(url);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const imageChange = async (e) => {
    const imageData = e.target.files[0];
    try {
      const add = await client.add(imageData, {
        progress: (prog) => console.log("image id upload : ", prog),
      });
      const url = `https://theonnfts.infura-ipfs.io/ipfs/${add.path}`;
      setImage(url);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const connectWallet = () => {
    event.preventDefault();

    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };

  // Main function to list an item. First it mint an NFT and then List an nft.
  const createItem = async (url) => {
    setisListing(true);

    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      signer
    );

    let transaction = await nftContract.mintToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    let convertedPrice = ethers.utils.parseUnits(formData.price, "ether");
    const nftMarketPlaceContract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let listingPrice = await nftMarketPlaceContract.getListingPrice();
    listingPrice = await listingPrice.toString();
    let listingTx = await nftMarketPlaceContract.listItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      convertedPrice,
      { value: listingPrice }
    );
    await listingTx.wait();

    router.push("/marketplace");
    setisListing(false);
  };

  const listAnItem = async () => {
    event.preventDefault();

    setisListing(true);
    const { name, price, category, rating, description, supply } = formData;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !rating ||
      !storyData ||
      !file ||
      !image ||
      !supply
    ) {
      console.log("Some feild are missing");
      setisListing(false);
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      category,
      rating,
      supply,
      storyData,
      image: image,
      file: file,
    });
    try {
      const added = await client.add(data);
      const url = `https://theonnfts.infura-ipfs.io/ipfs/${added.path}`;
      const supplyNum = parseInt(supply);

      createItem(url, supplyNum);
    } catch (error) {
      console.log("Error in listAnItem function ", error);
    }
  };

  return (
    <>
      <div className="story_preview">
        <div className="story_left">
          <img src="https://img.icons8.com/fluency-systems-filled/48/null/left-squared.png" />
          <section>
            <h5>Add Story Info</h5>
            <h2>Untitled Story</h2>
          </section>
        </div>
        <div className="story_btn">
          <button> Cancel </button>
          <button> Skip</button>
        </div>
      </div>
      <div className="flex justify-center  container create_item rowx">
        <section className="create_form ">
          <form action="">
            {step === 1 && (
              <div>
                <div className="col50">
                  <h2>Story Details</h2>
                  <label htmlFor="Title "> Title</label>
                  <input
                    id="name"
                    placeholder="e.g. Love is in the air"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                  />
                  <label htmlFor=""> Description</label>
                  <input
                    id="description"
                    type="text"
                    placeholder="e.g.This is most unique monkey in the world."
                    label="Description"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  />
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium  dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    type="text"
                  >
                    <option defaultValue="Love">Love</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Vampire">Vampire</option>
                    <option value="Random">Random</option>
                    <option value="Education">Education</option>
                    <option value="Politics">Politics</option>
                    <option value="Religion">Religion</option>
                  </select>
                  <label
                    htmlFor="rating"
                    className="block mb-2 text-sm font-medium  dark:text-white"
                  >
                    Rating
                  </label>
                  <select
                    type="text"
                    id="rating"
                    value={formData.rating}
                    onChange={handleRatingChange}
                    className="  "
                  >
                    <option defaultValue="generalAud">General Audiences</option>
                    <option value="matureaudiences">Mature Audiences</option>
                  </select>
                  <label htmlFor="">Price</label>
                  <input
                    id="price"
                    type="text"
                    placeholder="e.g.10 (In Polygon)"
                    label="Price"
                    value={formData.price}
                    onChange={handlePriceChange}
                  />

                  <label htmlFor="">supply</label>
                  <input
                    id="price"
                    type="text"
                    placeholder="e.g.10 (In Polygon)"
                    label="Price"
                    value={formData.supply}
                    onChange={handleSuppyChange}
                  />

                  <button
                    type="button"
                    className="btn_submit_nft"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
                <section className="col50 nft_uploaded_image">
                  <label htmlFor="Cover Image"> Cover Image</label>
                  <input
                    id="image"
                    accept=".jpg,.png, .jpeg"
                    placeholder="Choose image file"
                    label="3 Image"
                    type="file"
                    onChange={imageChange}
                  />
                  {image ? <img src={image} alt="Choosen image" /> : null}
                </section>{" "}
              </div>
            )}

            {step === 2 && (
              <>
                <section className=" nft_uploaded_image">
                  <label htmlFor="Cover Image"> Upload Music</label>
                  <input
                    id="file"
                    type="file"
                    accept="audio/mp3,audio/*;capture=microphone"
                    placeholder="Upload file"
                    label="File"
                    onChange={onChange}
                  />

                  {file ? (
                    <embed
                      src={file}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                    />
                  ) : null}
                </section>{" "}
                <label
                  htmlFor="
"
                >
                  {" "}
                  Lyrics
                </label>{" "}
                <div>
                  <ReactQuill
                    theme="snow"
                    value={storyData}
                    onChange={handlePenpaltextarea}
                  />
                </div>
                <button
                  type="button"
                  className="btn_submit_nft"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
                {!isConnected ? (
                  <button
                    text="List NFT"
                    className="btn_submit_nft"
                    onClick={connectWallet}
                    disabled={isListing}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    text="List NFT"
                    className="btn_submit_nft"
                    onClick={listAnItem}
                    disabled={isListing}
                  >
                    Upload Music
                  </button>
                )}
              </>
            )}
          </form>
        </section>
      </div>
    </>
  );
}
