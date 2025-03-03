import Tr from "./tr";


export default function Body({data , setchang ,  chang}){
    return(
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
              description
            </th>
            <th scope="col" className="px-6 py-3">
              status
            </th>
            <th scope="col" className="px-6 py-3">
              parent
            </th>
            <th scope="col" className="px-6 py-3">
              sort
            </th>
            <th scope="col" className="px-6 py-3">
              products
            </th>
  
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
                {data.map((e) => (
                  <Tr data={e} key={e.id} setchang  ={setchang}  chang ={chang} />
                ))}
        </tbody>
      </table>
    )
}