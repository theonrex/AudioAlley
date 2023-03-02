import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useSigner } from "wagmi";
import ListItem from "../list-item/ListItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Authmessage from "./Authmessage";
export default function Auth() {
  //wagmi signer
  const { data: signer } = useSigner();
  const [connector, setConnector] = useState(null);
  const [connected, setConnected] = useState(false);

  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    // This code will only run after the server has rendered the page
    setConnector(activeConnector);
    setConnected(isConnected);
  }, []);
  return (
    <section className=" container-xxl ">
      {!connected ? <Authmessage /> : <ListItem />}
    </section>
  );
}
