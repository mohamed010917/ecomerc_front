export default function Content({data}){
    return(
     <div>
        <h1 className="w-fit m-auto text-black dark:text-white font-bold text-2xl">{data.name}</h1>
        <div className="img w-full text-center">
            <img className="w-20 h-20 rounded-md m-auto" src={data.img} alt="catgory" />
        </div>
        <div className="discrp shadow-md rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto bg-gray-200 dark:bg-gray-700 text-gray-950 dark:text-white">
            <h2 className="font-bold w-fit m-auto p-4">description</h2>
            {data.description}
        </div>
        <div className="discrp shadow-md rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto bg-gray-200 dark:bg-gray-700 text-gray-950 dark:text-white">
            <h2 className="font-bold w-fit m-auto p-4">meta description</h2>
            {data.meta_description}
        </div>
        <div className="discrp shadow-md rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto bg-gray-200 dark:bg-gray-700 text-gray-950 dark:text-white">
            <h2 className="font-bold w-fit m-auto p-4">meta title</h2>
            {data.meta_title}
        </div>
        <div className="discrp flex-wrap shadow-md rounded-md flex justify-between items-center p-4 w-[90%] mt-2 ml-auto mr-auto bg-gray-200 dark:bg-gray-700 text-gray-950 dark:text-white">
           <div className="">
                <h2 className="font-bold w-fit m-auto p-4 text-center">slug</h2>
                <p className="text-center">{data.slug}</p>
           </div>
           <div className="">
                <h2 className="font-bold w-fit m-auto p-4 text-center">sorting</h2>
                <p className="text-center">{data.sorting}</p>
           </div>
       
           <div className="">
                <h2 className="font-bold w-fit m-auto p-4 text-center" >proudect count</h2>
                <p className="text-center">{data.proudect_count}</p>
           </div>
           <div className="">
                <h2 className="font-bold w-fit m-auto p-4 text-center">parent</h2>
                <p className="text-center">{data.parent ? data.parent.name : "no"}</p>
           </div>
        </div>
     </div>
    );
}