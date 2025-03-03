
import Link from "next/link";
import { useGetTopProudectsQuery } from "../../rtk/slice/proudects";
import Ele from "./ele";

export default function Proudect(){
      const { data: proudect, error, isLoading } = useGetTopProudectsQuery();
      if(isLoading) return (<div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>.</div>) ;
      if(error) return (<div>error....</div>) ;
   if(proudect.data){
       return(
           <div className="p-4 w-full  text-black dark:text-white">
               <h3 className="text-center text-2xl text-yellow-500 m-6">Top Selling Products for you</h3>
             
               
               <div className="flex gap-6 justify-center items-center flex-wrap">
                   {
                       proudect.data.map((e)=>{
                           return(
                                <Ele e={e} key={e.id}/>
                           )
                       })
                   }
               </div>
               <div className="w-full text-center ">
   
               <Link href={"/proudect"} className="bg-blue-500 pr-6 pl-6 block text-lg cursor-pointer mt-12 mr-auto ml-auto w-fit text-white px-4 py-2  rounded-full"> show all</Link>
               </div>
           </div>
       )
   }
}