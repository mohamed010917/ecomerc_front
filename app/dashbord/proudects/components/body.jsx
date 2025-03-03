import Tr from "./tr";


export default function Body({data , setchang ,  chang}){
 
    if(Array.isArray(data)){
      return(
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                image
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                short description
              </th>
              <th scope="col" className="px-6 py-3">
                catgory
              </th>
              <th scope="col" className="px-6 py-3">
                color
              </th>
              <th scope="col" className="px-6 py-3">
                brand
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
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
           {data && data.map((e) => (
              <Tr data={e} key={e.id} setchang  ={setchang}  chang ={chang} />
            ))}
          </tbody>
        </table>
      )
 
    }
}