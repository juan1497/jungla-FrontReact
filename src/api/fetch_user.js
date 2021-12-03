import {REGISTER,LOGIN,LOGOUT} from "./fetch_routes"

let bearer = null;

// bearer = `bearer ${JSON.parse(localStorage.getItem("token"))}`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: bearer,
};

export const register= async (form)=>{
    const registerFetch = await fetch(REGISTER, {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(form),
      });
      const res = await registerFetch.json();
      if(res.error){
        throw new Error("No se ha podido registrar el usuario", res.message);
      }
      if (!registerFetch) {
        throw new Error("No se ha podido registrar el usuario", res.message);
      }
      return res;
}
export const login = async (form) => {
    const loginFetch = await fetch(LOGIN, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(form),
    });
    const res = await loginFetch.json();
    if(res.error){
      throw new Error(res.error);
    }
    localStorage.setItem("token",res.data.token)
    localStorage.setItem("user",res.data.user.name)
    localStorage.setItem("email",res.data.user.email)
    localStorage.setItem("role",res.data.user.role)

    if (!loginFetch.ok) {
      throw new Error("No se ha podido efectuar el login", res.message);
    }
    return res;
}

export const logout =async()=>{
    const token=localStorage.getItem("token")
    const logoutFetch = await fetch(LOGOUT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token
        }
      });
      
    const res = await logoutFetch.json();
      return res;
}