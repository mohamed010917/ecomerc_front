import Table from "./commponents/table";

export default function Page(){
    return (
        <div className="dark:bg-gray-900 bg-gray-50 p-4 w-full  min-h-[100vh]"> 
        <div className="flex justify-between items-center">
            <h1 className=" text-black dark:text-white text-2xl p-2 mb-4 font-bold">orders</h1>
          
        </div>
            <Table/>
        </div>
    )
}