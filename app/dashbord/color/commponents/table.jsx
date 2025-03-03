export default function Table({data ,chang,setchang}){
    function del(id){
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/colors/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "delete"})

        })
          .then((response) => {

            if (!response.ok) {
              console.log("error")
            }
            setchang(! chang);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
    if(data){
        return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between p-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  color
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>  
                <th scope="col" className="px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
                 {
                    data.map(e =>{
                        return(
                           <tr key={e.id}>
                            <td>{e.id}</td>
                            <td >
                                <span className="w-10 block h-10 p-2 rounded-md " style={{backgroundColor : e.code }}></span>
                            </td>
                            <td>{e.name}</td>
                            <td>         
                                 <button onClick={() => del(e.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">
                                    Delete
                                </button></td>
                           </tr>
                        )
                    })
                 }
            </tbody>
          </table>
                </div>
            </div>
        )
    }else{
        return(
            <div>loading</div>
        )
    }
}