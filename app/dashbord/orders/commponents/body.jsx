import Tr from "./tr";

export default function Body({data ,  setpage ,  setchang , chang  }){
    return(
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              user
            </th>
            <th scope="col" className="px-6 py-3">
              status
            </th>
            <th scope="col" className="px-6 py-3">
              payment_method
            </th>
            <th scope="col" className="px-6 py-3">
              payment_status
            </th>
            <th scope="col" className="px-6 py-3">
              delvery_type
            </th>
            <th scope="col" className="px-6 py-3">
               price
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>

        
        {data.map((data) => (
            <Tr data={data} setpage={setpage} setchang={setchang} chang={chang} key={data.id} />
          ))}
        </tbody>
      </table>
    )
}