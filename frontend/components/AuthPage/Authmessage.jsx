import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Authmessage() {
  //wagmi signer
  return (
    <>
       <section className="secure">
      <h1>Connect Your</h1>
      <h2>Wallet</h2>
      <p>to proceed......</p>
      <section className="secure_ConnectButton">
        <ConnectButton />
      </section>
    </section></>
  );
}
