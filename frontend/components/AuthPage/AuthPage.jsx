import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import ListItem from "../list-item/ListItem";
import { useRouter } from "next/router";
import Authmessage from "./Authmessage";

export default function Auth() {
  const router = useRouter();

  //wagmi signer
  const [connector, setConnector] = useState(null);
  const [connected, setConnected] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const { connector: activeConnector, isConnected } = useAccount();

  useEffect(() => {
    // This code will only run after the server has rendered the page
    setConnector(activeConnector);
    setConnected(isConnected);
  }, [isConnected]);



  const setIsConnected = () => {
    setConnected(true);
  };

  return (
    <section className=" container-xxl ">
      {connected ? <ListItem /> : <Authmessage />}
    </section>
  );
}
