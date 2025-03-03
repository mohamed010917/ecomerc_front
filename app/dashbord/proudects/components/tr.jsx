import Link from "next/link";


export default function Tr({data , setchang,  chang}){

    function del(id){
        
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/proudects/${id}`, {
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
    return(
        <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">   
        <td className="px-6 py-4">{data.id}</td>
        <td className="px-6 py-4"><img className="w-10 h-10 rounded-full" src={data.img} alt="no" /></td>
        <td className="px-6 py-4">{data.name}</td>
        <td className="px-6 py-4">{data.short_description}</td>
        <td className="px-6 py-4">{data.catgory ? data.catgory.name : "no"}</td>
        <td className="px-6 py-4">{ data.color ? data.color.name :   "no"}</td>
        <td className="px-6 py-4">{data.brand ?  data.brand .name:  "no"}</td>
        <td className="px-6 py-4">{data.price}</td>
        <td className="px-6 py-4">{data.discount}</td>
        <td className="px-6 py-4">{data.quantity}</td>
        <td className="px-6 py-4 flex gap-2">

          <Link
            href={`/dashbord/proudects/edit/${data.id}`}
           className="font-medium  text-blue-600 dark:text-blue-500 hover:underline">
            Edit 
          </Link>

          <Link
            href={`/dashbord/proudects/${data.id}`}
           className="font-medium  text-green-600 dark:text-green-500 hover:underline">
            show 
          </Link>
          <button onClick={() => del(data.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">
            Delete
          </button>
        </td>

      </tr>
    )
}