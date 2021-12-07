const URL="https://jungla-eosin.vercel.app"
// const URL="http://localhost:4000"
//HABITATS
const GET_HABITATS=`${URL}/habitat/`
const GET_HABITAT=`${URL}/habitat/`//id
const ADD_HABITAT=`${URL}/habitat/add/`//data
const UPDATE_HABITAT=`${URL}/habitat/update/`//data
const DELETE_HABITAT=`${URL}/habitat/delete`
//ANIMALS
const GET_ANIMALS=`${URL}/animal/`
const GET_ANIMAL=`${URL}/animal/`//id
const ADD_ANIMAL=`${URL}/animal/add/`//data
const UPDATE_ANIMAL=`${URL}/animal/update`//data
const DELETE_ANIMAL=`${URL}/animal/delete/`//date
//fAMILY
const GET_FAMILIES=`${URL}/family/`
const GET_FAMILY=`${URL}/family/`//id
const ADD_FAMILY=`${URL}/family/add/`//data
const UPDATE_FAMILY=`${URL}/family/update/`//data
const DELETE_FAMILY=`${URL}/family/delete`

//USER
const REGISTER=`${URL}/user/register`
const LOGIN=`${URL}/user/login`
const LOGOUT=`${URL}/user/logout`


export{
    GET_HABITATS,GET_HABITAT,ADD_HABITAT,UPDATE_HABITAT,DELETE_HABITAT,
    GET_ANIMALS,GET_ANIMAL,ADD_ANIMAL,UPDATE_ANIMAL,DELETE_ANIMAL,
    GET_FAMILIES,GET_FAMILY,ADD_FAMILY,UPDATE_FAMILY,DELETE_FAMILY,
    REGISTER,LOGIN,LOGOUT
}


