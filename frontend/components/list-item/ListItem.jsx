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
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
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
  const [songData, setSongData] = useState("");
  const [priceError, setPriceError] = useState("");
  const [submitError, setsubmitError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    price: "",
    name: "",
    category: "",
    rating: "",
    description: "",
    artistName: "",
  });

  // Add event listeners to update form data state
  const handleNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };
  const handlePenpaltextarea = (value) => {
    setSongData(value);
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

  const handleArtistNameChange = (event) => {
    setFormData({ ...formData, artistName: event.target.value });
  };

  // On mount, check if there is saved form data in localStorage

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

  useEffect(() => {
    // Load the songData value from local storage when the component mounts
    const savedData = localStorage.getItem("songData");
    if (savedData) {
      setSongData(savedData);
    }
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // On form cancellation, clear form data from localStorage
  const handleCancel = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("songData");
    setSongData({
      songData: "",
      savedData: "",
    });
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      rating: "",
      file: "",
      image: "",
      artistName: "",
    });
  };
  // On form cancellation, clear form data from localStorage
  const handleSubmitCancel = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("songData");
    setSongData({
      songData: "",
      savedData: "",
    });
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      rating: "",
      file: "",
      image: "",
      artistName: "",
    });
  };

  // Save form data to localStorage on each change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    // Save the songData value to local storage whenever it changes
    localStorage.setItem("songData", songData);
  }, [songData]);

  //wagmi signer
  const { data: signer } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  // Onchange of file
  const onChange = async (e) => {
    setIsUploading(true);
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
    setIsUploading(false);
  };

  const imageChange = async (e) => {
    setIsUploadingImage(true);
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
    setIsUploadingImage(false);
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
  const handlePriceError = (event) => {
    const price = event.target.value;
    // check if the input is a number
    if (!isNaN(price)) {
      setFormData({ ...formData, price });
      setPriceError("");
    } else {
      setPriceError("Please enter a valid number");
    }
  };

  const handleNextError = (event) => {
    event.preventDefault();

    const { name, price, category, rating, description, artistName } = formData;
    // check if the input is a number
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !rating ||
      !songData ||
      !file ||
      !image ||
      !artistName
    ) {
      setsubmitError("Some input filed is missing");
      setisListing(false);

      setPriceError("");
    } else {
      setPriceError("Please enter a valid number");
    }
  };

  const listAnItem = async () => {
    event.preventDefault();

    setisListing(true);
    const { name, price, category, rating, description, artistName } = formData;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !rating ||
      !songData ||
      !file ||
      !image ||
      !artistName
    ) {
      setsubmitError("Some input filed is missing");
      setisListing(false);
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      category,
      rating,
      artistName,
      songData,
      image: image,
      file: file,
    });
    try {
      const added = await client.add(data);
      const url = `https://theonnfts.infura-ipfs.io/ipfs/${added.path}`;

      createItem(url);
      handleSubmitCancel();
    } catch (error) {
      console.log("Error in listAnItem function ", error);
    }
  };

  return (
    <>
      <div className="song_preview container">
        <div className="song_left ">
          <section>
            <h5>Add song Info</h5>
            <h2> {formData.name ? formData.name : <> Untitled</>}</h2>
          </section>
        </div>
        <div className="song_btn">
          <button onClick={handleCancel}> Cancel </button>
        </div>
      </div>
      <div className="flex justify-center  container create_item rowx">
        <section className="create_form ">
          <form action="">
            {submitError ? (
              <p className="handlePriceError">{submitError}</p>
            ) : null}
            {step === 1 && (
              <div>
                <div className="rowx">
                  <div className="col50">
                    <h2>Song Details</h2>
                    <label htmlFor="Title ">Song Title</label>
                    <input
                      id="name"
                      placeholder="e.g. Love is in the air"
                      label="Name"
                      value={formData.name}
                      onChange={handleNameChange}
                    />
                    <label htmlFor=""> Description</label>
                    <input
                      id="description"
                      placeholder="e.g.This is most unique song in the world."
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
                    >
                      <option defaultValue="Select">Select</option>
                      <option value="Love">Love</option>
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
                      id="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      className="  "
                    >
                      <option defaultValue="">Select</option>
                      <option value="  General Audience">
                        General Audience
                      </option>
                      <option value="mature audience">Mature Audience</option>
                    </select>
                    <label htmlFor="">Price</label>
                    {priceError && (
                      <p className="handlePriceError">{priceError}</p>
                    )}

                    <input
                      id="price"
                      placeholder="e.g.10 (In FANTOM)"
                      label="Price"
                      value={formData.price}
                      onChange={(handlePriceChange, handlePriceError)}
                    />

                    <label htmlFor="">Artist Name </label>
                    <input
                      id="artistname"
                      placeholder="e.g. Olivia"
                      label="artistname"
                      value={formData.artistName}
                      onChange={handleArtistNameChange}
                    />
                  </div>
                  <section className="col50 nft_uploaded_image">
                    <label htmlFor="Cover Image"> Cover Image</label>
                    <input
                      id="image"
                      accept=".jpg,.png, .jpeg, .jfif"
                      placeholder="Choose image file"
                      label="3 Image"
                      type="file"
                      onChange={imageChange}
                    />
                    {isUploadingImage ? <p>Loading.....</p> : null}
                    {image ? <img src={image} alt="Choosen image" /> : null}
                  </section>{" "}
                  <br />
                </div>
                <button
                  type="button"
                  className="Previous_next"
                  onClick={handleNextStep}
                >
                  Next
                </button>
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
                  {isUploading ? <p>Loading.....</p> : null}

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
                    value={songData}
                    onChange={handlePenpaltextarea}
                  />
                </div>
                <button
                  type="button"
                  className=" Previous_next"
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
                    {isListing ? "Loading " : "Upload Music"}
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
