import Tr from "./tr";

export default function Body(props){
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
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              phone
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              is admin
            </th>
            <th scope="col" className="px-6 py-3">
              country
            </th>
            <th scope="col" className="px-6 py-3">
              city
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>

        
        {props.data.map((user) => (
            <Tr user={user} setpage={props.setpage} setchang={props.setchang} chang={props.chang} key={user.id} />
          ))}
        </tbody>
      </table>
    )
}