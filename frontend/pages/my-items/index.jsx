import React from 'react'
import MyItems from '../../components/my-items/MyItems';


export default function MyItemsPage() {
  return (
      <div className="container rowx ">
        <header>Your Purchased Songs</header>

        <MyItems />
      </div>
  );
}
