import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import Homebanner from "../components/HomePageBanner";

import { FavouriteNFTs } from "../components/FavouriteNFTs/FavouriteNFTs";
import HomeMarketplace from "../components/HomeMarketplace/HomeMarketplace";
import About from "../components/About";

export default function Home() {
  return (
    <div>
  
   
<div className="rowx">



</div>


      <MainLayout>
        <Homebanner />
      <FavouriteNFTs />
      <HomeMarketplace />
      <About />
      </MainLayout>
    </div>
  );
}