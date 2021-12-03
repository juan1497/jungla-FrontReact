import React,{ useState,useEffect} from 'react'
import styled from 'styled-components'
import {GetHabitats} from "../../api/fetch_habitats"
import {useFormik} from "formik"
import {Link} from "react-router-dom"
import {addFamily} from "../../api/fetch_family"
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
const InputFamily= styled.input`
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
const AddFamily = () => {
    const [habitats,setHabitats]=useState([])
    const history = useHistory();
    const getHabitats= async()=>{
        try {
            const { data } = await GetHabitats();
            setHabitats(data.habitats.map(({_id,name})=>({_id,name})))
        } catch (err) {
            alert(err);
        }
    }
    const familyForm=useFormik({
        initialValues:{
            id:"",
            name:"",
            livingInGroup:false,
            habitat:""
        },onSubmit:async(values)=>{
            values.livingInGroup=values.livingInGroup=="true"?true:false;
            try{
                await addFamily(values)
                familyForm.resetForm();
                alert("family Creado")
                history.push("/add/family")
            }catch(err){
                alert(err)
            }
        }
    })
    useEffect(() => {getHabitats()},[])
    return (
        <div>
           <Contenedor>
                <Form onSubmit={familyForm.handleSubmit}>
                <Title> Family</Title>
                <InputFamily  name="id" onChange={familyForm.handleChange} type="number" placeholder="Ingresa un ID"/>
                    <InputFamily  name="name"onChange={familyForm.handleChange} type="text" placeholder="Ingresa un nombre"/>
                        <label>Viven en Grupo
                            <InputSelect onClick={familyForm.handleChange} name="livingInGroup">
                                <option value={false}>No</option>
                                <option value={true}>Si</option>
                            </InputSelect>
                        </label>
                        <fieldset>
                        <Legend>Habitat<Link exact to={'/add/habitat'}><Mas type="button" >➕</Mas></Link></Legend>
                        {habitats.map(h=>
                        <label>
                        <InputRadio onChange={familyForm.handleChange} name="habitat"type="radio" value={h._id}/>{h.name}
                        </label> 
                        )}
                    </fieldset>

                    <Submit class="enviar" type="submit" > Crear</Submit>

                </Form>
            </Contenedor>
        </div>
    )
}

export default AddFamily
