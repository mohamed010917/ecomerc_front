export default function Content({data}){
   if(data.user){
       return(
           <div className="discrp flex-wrap sm:flex-row flex-col  flex justify-between items-center p-4 w-[90%] mt-2 ml-auto mr-auto text-gray-950 dark:text-white">
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user name</h2>
                <p className="text-center">{data.user.name}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user email</h2>
                <p className="text-center">{data.user.email}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user phone</h2>
                <p className="text-center">{data.user.phone}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user address</h2>
                <p className="text-center">{data.user.address}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user city</h2>
                <p className="text-center">{data.user.city}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">user country</h2>
                <p className="text-center">{data.user.country}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">status</h2>
                <p className="text-center">{data.status}</p>
           </div>
       
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center" >payment method </h2>
                <p className="text-center">{data.payment_method}</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">payment status</h2>
                <p className="text-center">{data.payment_status }</p>
           </div>
           <div className="discrp shadow-lg mb-4 rounded-md p-4 w-[300px]">
                <h2 className="font-bold w-fit m-auto p-4 text-center">delvery type</h2>
                <p className="text-center">{data.delvery_type }</p>
       
           </div>
   
        </div>
       )
   }
}