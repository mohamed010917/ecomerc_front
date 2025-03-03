import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./rtk/provider";


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="dark:bg-gray-700 bg-slate-50">
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
