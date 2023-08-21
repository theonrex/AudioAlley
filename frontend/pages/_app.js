import React from "react";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/theme.css";
import "../styles/sidebar.css";
import Sidebar from "../components/navbar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "@rainbow-me/rainbowkit/styles.css";

import "react-jinke-music-player/assets/index.css";
import "../styles/style.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  WagmiConfig,
  defaultChains,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import "flowbite";
import LowBalance from "../components/LowBalance";

const FantomiChain = {
  id: 4002,
  name: "  FANTOM TESTNET",
  network: "FANTOM TESTNET",
  nativeCurrency: {
    decimals: 18,
    name: "FANTOM TESTNET",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/fantom_testnet",
  },
  blockExplorers: {
    default: {
      name: "FANTOM TESTNET",
      url: "https://testnet.ftmscan.com",
    },
  },
  testnet: true,
};
const { chains, provider, webSocketProvider } = configureChains(
  [FantomiChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== FantomiChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: " NFT Marketplace",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  webSocketProvider,

  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="light ">
          <Head>
            <meta
              name="description"
              content="Audio Alley is the ultimate platform for music artists to showcase and sell their songs to a global audience. Upload your tracks and start earning today!"
            />

            <link rel="shortcut icon" href="/assets/music logo.png" />
            <title> Audio Alley</title>
          </Head>
          <Navbar />
          <div>
            <LowBalance />
          </div>

          <div className="sideAndMainBar">
            <Sidebar />
            <div className="col80">
              <Component {...pageProps} />
            </div>
          </div>

          <Footer />
          <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
