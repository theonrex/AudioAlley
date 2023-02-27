const subscribe = async () => {
  setLoading(true);
  setError("");
  setSuccess(false);

  try {
    // Create provider and signer
    const provider = new ethers.providers.JsonRpcProvider(ankrTestnet);
    const signer = provider.getSigner();
    const user = await signer.getAddress();

    // Create PENPAL contract instance
    const contract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );
    let subscriptionPrice = await contract.getSubscriptionPrice();

    let convertedPrice = ethers.utils.parseEther(
      subscriptionPrice.toString(),
      "ether"
    );
    // subscriptionPrice = await subscriptionPrice.toString();
    console.log(convertedPrice);

    // Subscribe to PENPAL contract
    const tx = await contract.subscribe(user, {
      value: convertedPrice,
    });
    await tx.wait();
    setSuccess(true);
  } catch (err) {
    console.error(err);
    setError(err.message);
  }

  setLoading(false);
};
