import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Nav from "./commponents/Nav";
import Fotter from "./commponents/fotter";


export default function RootLayout({ children }) {
  
  return (
 
        <>
         <Nav />
            {children}
          <Fotter />
        </>


  );
}
