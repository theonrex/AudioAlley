import React from "react";
import { useAccount, useConnect, useSigner } from "wagmi";
import ListItem from "../list-item/ListItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Auth() {
  //wagmi signer
  const { data: signer } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();
  return (
    <div className=" container-xxl ">
      {!isConnected ? (
        <div className="secure">
          <h1>Connect Your</h1>
          <h2>Wallet</h2>
          <p>to proceed......</p>
          <div className="secure_ConnectButton">
            <ConnectButton />
          </div>
        </div>
      ) : (
        <ListItem />
      )}
    </div>
  );
}
