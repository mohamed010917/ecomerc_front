
import Link from "next/link";
export default function Conttent({data}){
    return(
        <>
            <Link className="p-2 font-bold rounded-md m-8 block w-fit bg-blue-700 text-white mb-8" href={"/dashbord/users"}>back</Link>
           <div className="flex items-center justify-center gap-4 p-2 flex-wrap">
            <div className="flex  flex-col items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <img
                src={data.img}
                alt="صورة المستخدم"
                className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              
            </div>
            </div>            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-center flex flex-col gap-4 sm:text-left">
            <h1 className="text-2xl font-bold">{data.name}</h1>
                <p>
                <strong>email:</strong> {data.email}
                </p>
                <p>
                <strong>phone:</strong> {data.phone}
                </p>
            </div>
            </div>            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="text-center flex flex-col gap-4 sm:text-left">
                    
                
                    <p>
                    <strong>address:</strong> {data.address}
                    </p>
                    <p>
                        <strong>city:</strong> {data.city}
                    </p>
                    <p>
                        <strong>country:</strong> {data.country}
                    </p>
                </div>
            </div>            
           </div>
        </>
    )
}