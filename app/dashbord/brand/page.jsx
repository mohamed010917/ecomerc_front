import Link from "next/link"
import Index from "./commponents"

export default function Page(){
    return (
        <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
        <div className="flex justify-between items-center">
          <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">Brand</h1>
            <Link href={"/dashbord/brand/add"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">add Brand</Link>
        </div>
            <Index />
        </div>
     
    )
}