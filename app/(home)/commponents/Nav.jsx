"use client";

import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import Link from "next/link";

import Car from "./car"
import Hamdauth from "./Hamdauth";
export default function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between shadow items-center p-4 pr-10 pl-10 static bg-white dark:bg-gray-900">
      <div className="logo text-3xl text-main font-bold">Shop</div>
      <ul className="category sm:flex hidden flex-1 justify-center gap-4 items-center">
        <li className="text-gray-800 dark:text-amber-50 cursor-pointer hover:text-amber-400">
          <Link href="/">Home</Link>
        </li>
        <li className="text-gray-800 dark:text-amber-50 cursor-pointer hover:text-amber-400">
          <Link href="/car">Car</Link>
        </li>
        <li className="text-gray-800 dark:text-amber-50 cursor-pointer hover:text-amber-400">
          <Link href={"/catgory"}>catgory</Link>
        </li>
        <li className="text-gray-800 dark:text-amber-50 cursor-pointer hover:text-amber-400">
        <Link href={"/brand"}>Brands</Link>
        </li>
      </ul>
      <div className="content flex gap-4 justify-center items-center">
        <div className="sm:flex hidden justify-center items-center">

        </div>
        <div className="car relative cursor-pointer">
  
          <Car />
        </div>
        <div
          className="mode cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {
            darkMode ? 
            <img
            className="w-12 h-8 dark:block hidden"
             src="/website/light-mode-button.png"
            alt="Light Mode"
          />
            :
            <img
            className="w-12 h-8 dark:hidden block"
            src="/website/dark-mode-button.png"
            alt="Dark Mode"
          />
          }
   

        </div>
        <Hamdauth />
      </div>
    </nav>
  );
}
