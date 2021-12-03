import {GET_FAMILIES,GET_FAMILY,ADD_FAMILY,UPDATE_FAMILY,DELETE_FAMILY} from "./fetch_routes"

export const GetFamilies= async (form)=>{
    const AnimalsFetch = await fetch(GET_FAMILIES, {

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
export const addFamily= async (form)=>{
  const AnimalsFetch = await fetch(ADD_FAMILY, {
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
    throw new Error("No se ha podido crear la familia", res.message);
    }
  return res;
}