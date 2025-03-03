"use client";
import Header from "./components/header";
import Nav from "./components/nav";
import Slid from "./components/slid";
import Fotter from "./components/fotter";
import Conte from './components/headerContext';

import { useState, createContext, useContext } from "react";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      
      <Conte.Provider value={{isOpen , setIsOpen}}>
        <Header />
        <Nav />
        <Slid />
        <div>{children}</div>
        <Fotter />
      </Conte.Provider>
    </div>
  );
}