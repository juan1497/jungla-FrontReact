import {GET_HABITATS,GET_HABITAT,ADD_HABITAT,UPDATE_HABITAT,DELETE_HABITAT} from "./fetch_routes"

export const GetHabitats= async ()=>{
    const AnimalsFetch = await fetch(GET_HABITATS, {

        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " +localStorage.getItem("token")
        }
    });
    const res = await AnimalsFetch.json();    
    return res;
}
export const AddHabitats= async (form)=>{
  const AnimalsFetch = await fetch(ADD_HABITAT, {

      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': "Bearer " +localStorage.getItem("token")
      },body:JSON.stringify(form)
  });
  const res = await AnimalsFetch.json();    
  if(res.error){
    throw new Error("No se ha podido crear el habitat", res.message);
    }
  return res;
}