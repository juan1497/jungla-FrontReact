import React ,{useState,useEffect} from 'react'
import "./UpdateForm.css"
import styled from 'styled-components'
import {useFormik} from "formik"
import {GetFamilies} from "../../../api/fetch_family"
import {GetAnimal}from "../../../api/fetch_animals"
const P=styled.label`
color:white !important;
margin-top:5px;
text-align: center;
margin-right: 3px;
font-size: 25px;
text-transform: capitalize;
`
const Select_update= styled.select`
border-style: none;
border-radius:7px;
text-align: center;
margin-left:20px;
`
const UpdateForm = (props) => {
    const [families,setFamilies]=useState([])
    
    const getAnimal=async()=>{
        try{
            const {data} =await GetAnimal(props.animal)
            console.log(data)
        }catch(err){alert(err.message)}
    
    }

    const updateForm = useFormik({
        initialValues:{
            _id:"",
            id:"",
            name:"",
            isCarnivore:true,
            family:""

        },onSubmit: async  (values) => {
            // try{
            //     const {data} = await GetFamilies();
            //     // setFamilies(data.animals)
            //     console.log(data)
            // }catch(err){
            //     alert(err);
            // }
        }
    })
    const getFamilies = async () =>{
        try{
            const {data} = await GetFamilies();
            // setFamilies(data.a)
            setFamilies(data.families.map(({_id,name})=>({_id,name})))

        }catch(err){
            alert(err);
        }
    }
    useEffect(()=>{getFamilies()},[])
    return (
        <>
            

        </>
    )
}

export default UpdateForm
