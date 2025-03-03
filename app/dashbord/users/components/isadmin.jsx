export default function Isadmin({id , is_admin ,setchang ,chang}){
    function adminActive(){
        console.log(is_admin)
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/users/isAdmin/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` ,  "Content-Type": "application/json" },
          credentials: "include",
          body:JSON.stringify({_method : "put"})

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
        <div>
            {
            is_admin == 1 ?
            <div className="flex gap2">
                <button className="text-white rounded-md p-2 bg-red-700" onClick={adminActive}>remove</button>
            </div>
            :
            <div className="flex gap2">
                <button className="text-white rounded-md p-2 bg-green-700" onClick={adminActive}>add</button>
            </div>
        }
        </div>
    ) ;
}