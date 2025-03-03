
import Proudect from "./proudect.jsx"
export default function Mide(){
    return(
        <>
        <div className="flex justify-between  items-center gap-4 rounded-3xl shadow sm:flex-row flex-col pg-main w-[90%] sm:h-[350px] h-auto m-auto mt-20 mb-20">
            <div className="one p-8 sm:w-[34%] w-[100%]">
                <p className=" text-white">30% off</p>
                <h1 className=" text-white text-7xl font-bold">Fine Smile</h1>
                <p className=" text-white">pay now</p>
            </div>
            <div className="two p-8 sm:w-[40%] w-[100%]">
                <img src={'/hero/headphone.png'} alt="no" className=" sm:w-[400px] sm:h-[400px]"/>
            </div>
            <div className="three sm:w-[34%] w-[100%] pr-10 p-6">
            <p className=" text-white text-2xl flex flex-col gap-4">Air Solo Bass</p>
                <h1 className=" text-white text-5xl font-bold">Winter Sale</h1>
                <p className=" text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis</p>
                <button className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 mt-6 pr-4">shop now</button>
            </div>
        </div>
        <Proudect />
        <div className="flex justify-between  items-center gap-4 rounded-3xl shadow sm:flex-row flex-col bg-green-500 w-[90%] sm:h-[350px] m-auto mt-20 mb-20">
            <div className="one p-8 sm:w-[34%] w-[100%]">
                <p className=" text-white">30% off</p>
                <h1 className=" text-white text-7xl font-bold">Fine Smile</h1>
                <p className=" text-white">pay now</p>
            </div>
            <div className="two p-8 sm:w-[40%] w-[100%] ">
                <img src={'/category/smartwatch2-removebg-preview.png'} alt="no" className=" sm:w-[400px] sm:h-[400px]"/>
            </div>
            <div className="three sm:w-[34%] w-[100%]  pr-10 p-6">
            <p className=" text-white text-2xl flex flex-col gap-4 ">Air Solo Bass</p>
                <h1 className=" text-white text-5xl font-bold">Winter Sale</h1>
                <p className=" text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis</p>
                <button className="bg-white text-main w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 mt-6 pr-4">shop now</button>
            </div>
        </div>
        </>
    )
}