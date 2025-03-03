"use client";

import { useState , useEffect } from "react";
import Conte from './headerContext';

import {  createContext, useContext } from "react";
export default function Header(){
  const { isOpen , setIsOpen}  = useContext(Conte);  
  async function logout(){
    let token = document.cookie.split("admin=")[1];
    let response = await fetch("http://127.0.0.1:8000/api/logout",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // إرسال التوكن
      },
        credentials: "include",
       
    });
    if (response.ok) {
      // حذف الكوكي بعد تسجيل الخروج
      document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload(); // تحديث الصفحة بعد تسجيل الخروج
    } else {
      console.error("Logout failed");
    }
  }
  const [isActive, setIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);
    return(
      <header className="bg-white dark:bg-gray-800 border-b shadow dark:border-gray-700 p-2 flex items-center justify-between ">
        <div className="logo flex gap-4  items-center">
        <div className="text-center w-8  cursor-pointer flex flex-col gap-1"  onClick={() => setIsOpen(true)}
          >
            <span className="w-full p-[2px] dark:bg-slate-200 bg-black block"></span>
            <span className="w-full p-[2px] dark:bg-slate-200 bg-black block"></span>
            <span className="w-full p-[2px] dark:bg-slate-200 bg-black block"></span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="mode cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                  <img className='w-12 h-8 dark:block hidden' src="/website/dark-mode-button.png" alt="logo" />
                  <img className='w-12 h-8 dark:hidden block' src="/website/light-mode-button.png" alt="logo" />
          </div>
          <button className="bg-red-400 p-1  font-bold text-white rounded-lg" onClick={logout}>Logout</button>
        </div>
 
      </header>
    )
}