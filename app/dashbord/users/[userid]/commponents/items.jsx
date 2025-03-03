export default function Items({data , SetChang , chang}){
    function del(id){
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/items/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "delete"})

        })
          .then((response) => {

            if (!response.ok) {
              console.log("error")
            }
            SetChang(! chang)
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }

    if(Array.isArray( data) && data.length > 0){
   
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
                product
                </th>
                <th scope="col" className="px-6 py-3">
                    quantity
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
            {
                data.map((e , i)=>{

                    return (<tr key={i}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">{e.id}</td>
                        <td className="px-6 py-4"><img className="w-20 h-20 rounded-full" src={e.proudect.img} alt="no" /></td>
                        <td className="px-6 py-4">{e.proudect.name}</td>
                        <td className="px-6 py-4">{e.quantity}</td>
                        <td className="px-6 py-4">{e.price}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button className="bg-red-500 rounded-md p-2 cursor-pointer text-white " onClick={() => del(e.id)}>Delete</button>
                        </td>
                    </tr>)
                })
            }
            </tbody>
            </table>
        )

    }
}