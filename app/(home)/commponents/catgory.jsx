import Link from "next/link";
import { useGetTopcatgoryQuery } from "../../rtk/slice/catgory";


export default function Category(){
      const { data: catgory, error, isLoading } = useGetTopcatgoryQuery();
      if(isLoading) return (<div>Loading....</div>) ;
      if(error) return (<div>error....</div>) ;
      if(catgory.data.length > 5){
        return(
            <div className="all p-10">
                
            <div className="one flex flex-wrap sm:flex-row flex-col justify-around gap-4 items-center">
              <div className="big  bg-yellow-300 relative w-[300px] h-[350px]  sm:w-[300px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content absolute z-50 left-0 flex p-4 font-bold justify-center flex-col gap-4">
                  <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[0].img} className="Slide 1 absolute max-sm:right-0 sm:right-[0px] top-0 w-[250px]  h-[250px]" />
              </div>
          
              <div className="big bg-gray-950 relative w-[300px] h-[350px]  sm:w-[300px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content absolute z-50 left-0 flex p-4 font-bold justify-center flex-col gap-4">
                <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[1].img} className="Slide 1 absolute max-sm:right-0 top-0 sm:right-[-90px] w-[250px]  h-[250px]" />
              </div>
              <div className="big pg-main relative  w-[300px] h-[350px] sm:w-[600px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content sm:relative absolute z-50 flex p-4 sm:w-[50%] font-bold  left-0  flex-col gap-4">
                <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[2].img} className="Slide 1 sm:relative right-[-15px] absolute w-[250px]  h-[250px]" />
              </div>
            </div>
            <div className="one mt-10 flex flex-wrap sm:flex-row flex-col justify-between gap-4 items-center">
            <div className="big bg-gradient-to-br from-gray-400/90 to-gray-100  relative  w-[300px] h-[350px] sm:w-[600px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content sm:relative z-50 absolute flex p-4 sm:w-[50%] font-bold  left-0  flex-col gap-4">
                <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[3].img} className="Slide 1 sm:relative right-[-15px] absolute w-[250px]  h-[250px]" />
              </div>
          
              <div className="big bg-green-400 relative w-[300px] h-[350px]  sm:w-[300px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content z-50 absolute left-0 flex p-4 font-bold justify-center flex-col gap-4">
                <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[4].img} className="Slide 1 absolute max-sm:right-0 sm:right-[0px] bottom-0 w-[250px]  h-[250px]" />
              </div>
          
              <div className="big bg-blue-400 relative  w-[300px] h-[350px]  sm:w-[300px]  sm:h-[350px] rounded-3xl p-2 flex gap-2 items-center justify-center">
                <div className="content absolute z-50 left-0 flex p-4 font-bold justify-center flex-col gap-4">
                <h1 className="text-white">{catgory.data[0].name}</h1>
                  <p className="text-white">{catgory.data[0].description }</p>
                  <Link href="/catgory" className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show More</Link>
                </div>
                <img src={catgory.data[5].img} className="Slide 1 absolute max-sm:right-0 sm:right-[-20px] w-[250px]  h-[250px]" />
              </div>
    
            </div>
          </div>
          
        )
      }
}