import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import "./Nav.css"
import {logout} from "../api/fetch_user"
import { useHistory } from 'react-router'
const Nav = () => {
    const history = useHistory();
    const {user,saveUser}=useContext(UserContext);
    const logoutf= async()=>{
        try{
            await logout();
            alert("saliendo")
            localStorage.clear()
            saveUser(null)
            history.push("/user/login")

        }catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid">
                    <Link to="/" style={{ "text-decoration": "none" }}>
                        <span class="navbar-brand home" >🐒La Jungla🦁</span>
                    </Link>
                    <button class="navbar-toggler burguer" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="">🌳</span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav text-center">
                            {user!=null?(
                                <>
                            <li class="nav-item item_list" >
                                <Link to="/animals" style={{ "text-decoration": "none" }}>
                                    <span class="nav-link fs-3">Animales</span>
                                </Link>
                            </li>
                            <li class="nav-item item_list">
                                <Link to="/habitats" style={{ "text-decoration": "none" }}>
                                    <span class="nav-link fs-3" >habitats </span>
                                </Link>
                            </li>
                            {user.role ==="admin"?<li class="nav-item item_list" >
                                <Link to="/add/animal" style={{ "text-decoration": "none" }}>
                                    <span class="nav-link fs-3"> Añadir Animal</span>
                                </Link>
                            </li>:null}
                            <li class="nav-item item_list" >
                                <span onClick={logoutf} style={{ "cursor":"pointer" }}class="nav-link fs-3"  >Salir</span>
                            </li></>):( 
                                <>
                            <li class="nav-item item_list">
                                <Link to="/" style={{ "text-decoration": "none" }}>
                                    <span class="nav-link fs-3" >Home</span>
                                </Link>
                            </li>
                            <li class="nav-item item_list"  >
                            <Link to="/user/login" style={{ "text-decoration": "none" }}>
                            <span class="nav-link fs-3" > Inicia sesion</span>
                            </Link>
                        </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
