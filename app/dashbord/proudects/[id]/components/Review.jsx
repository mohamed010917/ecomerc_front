export default function Review({data }){

    if(Array.isArray(data.reviews)){
       
        return(
            <div>
                <h1 className="m-auto p-4 text-2xl font-bold   w-fit text-black dark:text-white" >reviews</h1>
                <div className="mt-2 bg-white dark:bg-gray-800 relative overflow-x-auto p-4 rounded-lg shadow">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                comment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                user
                            </th>
                    
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.reviews.map(e =>{
                                
                                return (
        
                                    <tr key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">{e.id}</td>
                                        <td className="px-6 py-4">{e.comment}</td>
                                        <td className="px-6 py-4">{e.rating}</td>
                                        <td className="px-6 py-4">{e.user}</td>
                                     
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>

            </div>
        )

    }
    return(
        <div>

        </div>
    )
}