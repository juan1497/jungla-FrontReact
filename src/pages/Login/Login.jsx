import React ,{useContext,useState}from 'react'
import styled from 'styled-components';
import Modal from "./components/Modal"
import {UserContext} from "../../App"
import {useHistory} from "react-router-dom"
import { useFormik } from "formik"

import {login} from "../../api/fetch_user"
const Contenedor = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`
const Contenedor_Formulario = styled.div`
background-color:#262626;
margin-top: 5pc;
border-radius: 15px;
padding: 3pc;
`
const Form = styled.form`
display: flex;
flex-direction: column;
`
const Title = styled.h2`
margin-top:10px;
text-align: center;
color:white;
`
const Description_title = styled.p`
text-align: center;
color:hsla(0,0%,100%,.5);
padding: 10px !important;
`
const InputUI = styled.input`
color:white;
padding: 5px;
background-color: transparent;
border: white 1px solid;
border-radius: 4px;
text-align: center;
align-self: center;
margin-top: 20px;
`
const SubmitButton = styled.button`
margin-top: 48px;
align-self: center;
width: 100px;
border-style: none;
border: 1px solid white;
background-color: #262626;
border-radius: 4px;
color: white;
padding: 5px;
&:hover{
  background-color: white;
  color:black;
  transition: 0.8s;
}
`
const Title_register = styled.p`
color:white;
text-align: center;
`
const Register = styled.button`
margin-top: 48px;
align-self: center;
width: 100px;
border-style: none;
background-color: #262626;
border-radius: 4px;
color: hsla(0,0%,100%,.5)
`
const Login = () => {
  const { saveUser } = useContext(UserContext);
  const history = useHistory();
  const validates=(values)=>{
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }
    if (values.password<9) {
      errors.password = "Required";
    }
  }
  const loginForm = useFormik({
    initialValues:{
      email:"",
      password:""
    },validates,onSubmit: async(values)=>{
      try{
        const user=await login(values)
        saveUser(user.data.user)
        loginForm.resetForm();
        alert("Entrando")
        history.push("/")
      }catch(err){
        alert(err)
      }
    }
  })


  return (
    <div>
      <Contenedor>
        <Contenedor_Formulario >
          <Form onSubmit={loginForm.handleSubmit}>
            <Title>Login</Title>
            <Description_title>Porfavor introduce tu usuario y contraseña</Description_title>
            <InputUI type="email" onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} value={loginForm.values.email}name="email" placeholder="Email" />
            {loginForm.touched.email && loginForm.errors.email ? (
                    <Description_title className="error">{loginForm.errors.email}</Description_title>
                  ) : null}
            <InputUI type="password" onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}value={loginForm.values.password} name="password" placeholder="Contraseña" />
            {loginForm.touched.password && loginForm.errors.password ? (
                    <Description_title className="error">{loginForm.errors.password}</Description_title>
                  ) : null}
            <SubmitButton type="submit">Ingresar</SubmitButton>
          </Form>
          <Title_register>No tienes cuenta ?<Register type="button" class="registro" data-bs-toggle="modal" data-bs-target="#Register">Registrate</Register></Title_register>
        </Contenedor_Formulario>
      </Contenedor>
      <Modal/>
    </div >
  )
}

export default Login
