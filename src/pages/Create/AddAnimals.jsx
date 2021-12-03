import React,{ useState,useEffect} from 'react'
import styled from 'styled-components'
import {GetFamilies} from "../../api/fetch_family"
import {useFormik} from "formik"
import {Link} from "react-router-dom"
import {AddAnimal} from "../../api/fetch_animals"
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
const InputAnimal= styled.input`
border-style: none;
background-color: none;
border-radius:7px;
margin: 10px;
text-align: center;
`
const InputSelect =styled.select`
margin-left: 10px;
border-style: none;
width:50px;
border-radius:7px;
text-align: center;
`
const Legend= styled.legend`
text-align: center;
`
const Mas = styled.button`
border-style:none;
background:none;
`
const InputRadio= styled.input`
margin-left: 20px;

`
const Submit=styled.button`
margin: 30px;
border-style: none;
padding: 10px!important;
border-radius:7px;
`

const AddAnimals = () => {
    const [families,setFamilies]=useState([])
    const history = useHistory();
    const getFamilies= async()=>{
        try {
            const { data } = await GetFamilies();
            setFamilies(data.families.map(({_id,name})=>({_id,name})))
        } catch (err) {
            alert(err);
        }
    }
    const animalForm=useFormik({
        initialValues:{
            id:"",
            name:"",
            isCarnivore:false,
            family:""
        },onSubmit:async(values)=>{
            values.isCarnivore=values.isCarnivore=="true"?true:false;
            try{
                await AddAnimal(values)
                animalForm.resetForm();
                alert("Animal Creado")
                history.push("/animals")
            }catch(err){
                alert(err)
            }
        }
    })
    useEffect(() => {getFamilies()},[])
    return (
        <>
            <Contenedor>
                <Form onSubmit={animalForm.handleSubmit}>
                <Title> Animal</Title>
                <InputAnimal  name="id" onChange={animalForm.handleChange} type="number" placeholder="Ingresa un ID"/>
                    <InputAnimal  name="name"onChange={animalForm.handleChange} type="text" placeholder="Ingresa un nombre"/>
                        <label>Carnivoro
                            <InputSelect onClick={animalForm.handleChange} name="isCarnivore">
                            {/* <option value={null}>-</option> */}
                                <option value={false}>No</option>
                                <option value={true}>Si</option>

                            </InputSelect>
                        </label>
                        <fieldset>
                        <Legend>Family<Link  exact to={'/add/family'}><Mas type="button" >➕</Mas></Link></Legend>
                        {families.map(f=>
                        <label >
                        <InputRadio onChange={animalForm.handleChange} name="family"type="radio" value={f._id}/>{f.name}
                        </label> 
                        )}
                    </fieldset>

                    <Submit class="enviar" type="submit" > Crear</Submit>

                </Form>
            </Contenedor>
        </>
    )
}

export default AddAnimals
