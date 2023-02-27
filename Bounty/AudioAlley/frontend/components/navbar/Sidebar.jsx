import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Theme from "../Theme";
export default function Sidebar() {
  return (
    <aside id="logo-sidebar" className="" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-dark dark:bg-gray-800 sidebar">
        <ul className="space-y-2">
          <li>
            <a href="/" className=" nav_item">
              <span className="ml-3"> Home</span>
            </a>
          </li>
          <li>
            <a href="/my-items" className="nav_item">
              <span className="nav_span"> Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/marketplace" className="nav_item">
              <span className="nav_span"> Marketplace</span>
            </a>
          </li>
          <li>
            <a href="/createnft" className=" nav_item">
              <span className="nav_span"> Upload Music</span>
            </a>
          </li>

          <li>
            <a href="#" className="nav_item">
              <span className="nav_span">
                {" "}
                <Theme />
              </span>
            </a>
          </li>

          <li>
            <a href="#" className="nav_item"></a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
