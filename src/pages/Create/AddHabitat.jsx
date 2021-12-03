import React,{ useState,useEffect} from 'react'
import styled from 'styled-components'
import {useFormik} from "formik"
import {AddHabitats} from "../../api/fetch_habitats"
import { useHistory } from "react-router"

const Contenedor= styled.div`
display: flex;
justify-content: center;
padding: 20px;
`
const Title=styled.h1`
text-align: center;
`
const Form = styled.form`
background-color:#bbbbbb;
margin-top:3%;
display: flex;
justify-content: center;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
padding: 10px;
width:320px;
text-align: center;
align-self: center;
border-radius:7px;
`
const Inputhabitat= styled.input`
border-style: none;
background-color: none;
border-radius:7px;
margin: 10px;
text-align: center;
`
const InputSelect =styled.select`
margin-left: 10px;
border-style: none;
width:100px;
border-radius:7px;
text-align: center;
`
const Submit=styled.button`
margin: 30px;
border-style: none;
padding: 10px!important;
border-radius:7px;
`

const AddHabitat = () => {
    const history = useHistory();
    const habitatForm = useFormik({
        initialValues: {
            id: "",
            name: "",
            location: false,
            mode: "Tierra"
        }, onSubmit: async (values) => {
            
            try {
                await AddHabitats(values)
                habitatForm.resetForm();
                alert("habitats Creado")
                history.push("/add/family")
            } catch (err) {
                alert(err)
            }
        }
    })
    return (
        <div>
            <Contenedor>
                <Form onSubmit={habitatForm.handleSubmit}>
                <Title> Habitat</Title>
                <Inputhabitat name="id"onChange={habitatForm.handleChange} type ="number" placeholder="Ingresa un ID"/>
                <Inputhabitat name="name" onChange={habitatForm.handleChange}type ="text" placeholder="Ingresa un nombre"/>
                <Inputhabitat name="location"onChange={habitatForm.handleChange}  type ="text" placeholder="Latitud , Longitud"/>
                <label>Tipo:
                <InputSelect onChange={habitatForm.handleChange} name="mode">
                <option value="Tierra" >Tierra</option>
                <option value="Mar" >Mar</option>
                <option value="Aire">Aire</option>
                </InputSelect>
                </label>
                <Submit class ="enviar" type ="submit" >Enviar</Submit>
                </Form >
                </Contenedor>
            </div>
            )
}

export default AddHabitat
