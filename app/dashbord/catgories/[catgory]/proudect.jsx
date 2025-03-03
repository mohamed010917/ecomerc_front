export default function Proudect({data}){
  if(data){
    return(  
      <div className="p-4 w-full mt-2 mb-2">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
              <h1 className="font-bold mb-10 text-2xl text-black dark:text-white m-auto w-fit">Proudect</h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                              id
                              </th>
                              <th scope="col" className="px-6 py-3">
                              img
                              </th>
                              <th scope="col" className="px-6 py-3">
                              name
                              </th>
                              <th scope="col" className="px-6 py-3">
                              short_description
                              </th>
                              <th scope="col" className="px-6 py-3">
                              color
                              </th>
                              <th scope="col" className="px-6 py-3">
                              brand
                              </th>
                              <th scope="col" className="px-6 py-3">
                              status
                              </th>
                              <th scope="col" className="px-6 py-3">
                              price
                              </th>
                              <th scope="col" className="px-6 py-3">
                              discount
                              </th>
                              <th scope="col" className="px-6 py-3">
                              quantity
                              </th>
                  
                          </tr>
                          </thead>
                          <tbody>
                                  {data.map((e) => (
                                    <tr key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">   
                                    <td className="px-6 py-4">{e.id}</td>
                                    <td className="px-6 py-4"><img className="w-10 h-10 rounded-full" src={e.img} alt="no" /></td>
                                    <td className="px-6 py-4">{e.name}</td>
                                    <td className="px-6 py-4">{e.short_description}</td>
                                    <td className="px-6 py-4">{e.color ? e.color.name : "no"}</td>
                                    <td className="px-6 py-4">{ e.brand ? e.brand.name : "no" }</td>
                                    <td className="px-6 py-4">{e.status}</td>
                                    <td className="px-6 py-4">{e.price}</td>
                                    <td className="px-6 py-4">{e.discount}</td>
                                    <td className="px-6 py-4">{e.quantity}</td>
                                  </tr>
                                  ))}
                          </tbody>
                      </table>
                    </div>
                </div>
          </div>
      )

  }else{
    return(
      <div>loading</div>
    )
  }
}