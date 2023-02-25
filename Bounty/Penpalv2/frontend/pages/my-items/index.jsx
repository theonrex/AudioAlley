import React from 'react'
// import MainLayout from '../../components/layouts/MainLayout';
import MyItems from '../../components/my-items/MyItems';
// import SellerItems from "../../components/seller-items/SellerItems";


export default function MyItemsPage() {
  return (
      <div className="container rowx my_items">
        <header>Your Purchased NFTs</header>
        {/* <SellerItems /> */}

        <MyItems />
      </div>
  );
}
