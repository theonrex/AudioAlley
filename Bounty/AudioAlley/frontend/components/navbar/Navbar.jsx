import React from "react";
import { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import "flowbite";
import Musicpng from "../../public/assets/music logo.png";
import Image from "next/image";
import ProfileImage from "../../public/assets/2.png";
import SearchModal from "./SearchModal";
const Navbar = () => {
  return (
    <>
      <div className="full_nav_body">
        <div>
          <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div
                  suppressHydrationWarning
                  className="flex items-center justify-start main_nav"
                >
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  focus:outline-none focus:ring-2  dark:text-gray-400 "
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      />
                    </svg>
                  </button>
                  <a href="/" className="flex ml-2 md:mr-24 ">
                    <Image
                      src={Musicpng}
                      className="AudioAlley_logo"
                      alt="AudioAlley Logo"
                    />
                    <span className="AudioAlley self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                      AudioAlley
                    </span>
                  </a>
                </div>
                <div className="flex items-center nav_ConnectButton_show">
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "full",
                      largeScreen: "full",
                    }}
                  />
                  <div className="flex items-center ml-3 nav_profile_image">
                    <div suppressHydrationWarning>
                      <button
                        type="button"
                        className=" flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        // data-dropdown-toggle="dropdown-user"
                      >
                        <span className="sr-only">Open user menu</span>

                        <a href="/profile">
                          <Image
                            className="w-8 h-8 rounded-full"
                            src={ProfileImage}
                            alt="user photo"
                          />
                        </a>
                      </button>
                    </div>
                    <SearchModal />
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <aside
            id="logo-sidebar"
            className="nav_dropdown_bg fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
            suppressHydrationWarning
          >
            <div className="h-full px-8 pb-4 overflow-y-auto bg-black ">
              <ul className="space-y-5 nav_ul">
                <li>
                  <a
                    href="/"
                    className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
                  >
                    <span className="ml-3"> Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/my-items"
                    className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Dashboard
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/marketplace"
                    className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white "
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Marketplace
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/upload"
                    className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Upload Music
                    </span>
                  </a>
                </li>

                <li className="nav_SearchModal_li">
                  <SearchModal />
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Navbar;
