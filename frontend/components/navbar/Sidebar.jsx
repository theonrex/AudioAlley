import React from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";
export default function Sidebar() {
  return (
    <aside id="logo-sidebar" className="" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-dark dark:bg-gray-800 sidebar">
        <ul className="space-y-2">
          <li>
            <Link href="/" className=" nav_item">
              <span className="nav_span"> Home</span>
            </Link>
          </li>
          <li>
            <Link href="/my-items" className="nav_item">
              <span className="nav_span"> Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/marketplace" className="nav_item">
              <span className="nav_span"> Marketplace</span>
            </Link>
          </li>
          <li>
            <Link href="/upload" className=" nav_item">
              <span className="nav_span"> Upload Music</span>
            </Link>
          </li>
          <li className="border rounded-lg bg-gray-300 mx-2  flex flex-row items-center  ">
            <SearchModal /> 
          </li>
        </ul>
      </div>
    </aside>
  );
}
