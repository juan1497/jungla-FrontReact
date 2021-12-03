import {GET_ANIMALS,GET_ANIMAL,ADD_ANIMAL,UPDATE_ANIMAL,DELETE_ANIMAL} from "./fetch_routes"

export const AddAnimal= async (form)=>{
    const AnimalsFetch = await fetch(ADD_ANIMAL, {
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
    throw new Error("No se ha podido crear el animal", res.message);
    }
    
    return res;
}
export const GetAnimals= async ()=>{
    const AnimalsFetch = await fetch(GET_ANIMALS, {

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
    if(res.error){
    throw new Error("No se ha podido registrar el usuario", res.message);
    }
    
    return res;
}
export const GetAnimal= async (id)=>{
    const AnimalsFetch = await fetch(GET_ANIMAL+id, {
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
export const UpdateAnimal= async (form)=>{
    const AnimalsFetch = await fetch(UPDATE_ANIMAL, {
        method: "PUT",
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
    throw new Error("No se ha podido actualizar el animal", res.message);
    }
    
    return res;
}
export const DeleteAnimal= async (id)=>{
    const AnimalsFetch = await fetch(DELETE_ANIMAL+id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " +localStorage.getItem("token")
        }
    });
    const res = await AnimalsFetch.json();
    if(res.error){
    throw new Error("No se ha podido borrar el animal", res.message);
    }
    
    return res;
}