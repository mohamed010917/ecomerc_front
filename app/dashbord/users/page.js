import Link from "next/link";
import Table from "./components/table";

export default function page(){
    return(
        <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
        <div className="flex justify-between items-center">
          <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">users</h1>
            <Link href={"/dashbord/users/add"} className="p-2 font-bold bg-blue-700 text-white rounded-md ">add user</Link>
        </div>
            <Table />
        </div>
    )
}