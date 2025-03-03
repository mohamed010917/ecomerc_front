"use client"; // تأكد من أن الكود يعمل فقط على جانب العميل


import Image from "next/image";


import Slid from "./commponents/slid";
import Category from "./commponents/catgory";

import Custom from "./commponents/custom";
import Brand from "./commponents/brand";

import Mide from "./commponents/mide";
import Blog from "./commponents/blog";


export default function Home() {


  return (
    <div >

      <Slid />
      <Category />
      <Custom />
      <Mide />
      <Blog />
      <Blog />

   
    </div>
  );
}
