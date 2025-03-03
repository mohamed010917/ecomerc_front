export default function Content({data}){
    if(data.color){
        return(
         <div>
            <h1 className="w-fit m-auto text-black dark:text-white font-bold text-2xl">{data.name}</h1>
            <div className="img w-full text-center">
                <img className="w-20 h-20 rounded-md m-auto" src={data.img} alt="catgory" />
            </div>
            <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto  text-gray-950 dark:text-white">
                <h2 className="font-bold w-fit m-auto p-4">description</h2>
                {data.description}
            </div>
            <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto  text-gray-950 dark:text-white">
                <h2 className="font-bold w-fit m-auto p-4">meta description</h2>
                {data.meta_description}
            </div>
            <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto  text-gray-950 dark:text-white">
                <h2 className="font-bold w-fit m-auto p-4">short description</h2>
                {data.short_description}
            </div>
            <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto  text-gray-950 dark:text-white">
                <h2 className="font-bold w-fit m-auto p-4">meta title</h2>
                {data.meta_title}
            </div>
            <div className="discrp shadow-lg rounded-md p-4 w-[90%] mt-2 ml-auto mr-auto  text-gray-950 dark:text-white">
                <h2 className="font-bold w-fit m-auto p-4">slug</h2>
                {data.slug}
            </div>
            <div className="discrp flex-wrap sm:flex-row flex-col  flex justify-between items-center p-4 w-[90%] mt-2 ml-auto mr-auto text-gray-950 dark:text-white">
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center">price</h2>
                    <p className="text-center">{data.price}</p>
               </div>
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center">sorting</h2>
                    <p className="text-center">{data.sort}</p>
               </div>
           
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center" >proudect count</h2>
                    <p className="text-center">{data.quantity}</p>
               </div>
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center">catgory</h2>
                    <p className="text-center">{data.catgory.name }</p>
               </div>
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center">color</h2>
                    <p className="text-center">{data.color.name }</p>
                    <span className="w-10 h-10 rounded-lg block" style={{backgroundColor : data.color.code }}></span>
               </div>
               <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                    <h2 className="font-bold w-fit m-auto p-4 text-center">brand</h2>
                    <p className="text-center">{data.brand.name }</p>
               </div>
            </div>
         </div>
        );
    }
    return (<div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div></div>)
}