export default function Active({id , active ,setchang ,chang}){
  
    function handelActive(){
      console.log(active)
        let token = document.cookie.split("admin=")[1];
        fetch(`http://127.0.0.1:8000/api/users/active/${id}`, {
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
            active == "active" ?
            <div className="flex gap2">
                <button className="text-white rounded-md p-2 bg-red-700" onClick={handelActive}>InActive</button>
            </div>
            :
            <div className="flex gap2">
                <button className="text-white rounded-md p-2 bg-green-700" onClick={handelActive}>Active</button>
            </div>
        }
        </div>
    ) ;
}