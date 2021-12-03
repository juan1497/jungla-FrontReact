import React, { useState, useEffect, useContext } from 'react'
import {GetAnimal, GetAnimals, DeleteAnimal,UpdateAnimal } from '../../api/fetch_animals';
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import styled from "styled-components"
import { useFormik } from "formik"
import { GetFamilies } from "../../api/fetch_family"
const Formulario_filter = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top:20px;
`
const Input_filter = styled.input`
text-align: center;
border-style: none;
border-radius: 7px;
color: black;
margin-right: 10px;
`
const Select_text = styled.label`
margin-top:5px;
text-align: center;
margin-right: 3px;
font-size: 25px;
text-transform: capitalize;
`
const Select_filter = styled.select`
border-style: none;
width:70px;
border-radius:7px;
text-align: center;
margin-left: 5px;
`
const Title_list = styled.p`
text-align: center;
font-size: 25px;
text-transform: capitalize;
margin-top: 15px;
`
const List_animals = styled.ul`
list-style: none;
display: flex;
flex-wrap: wrap;
justify-content: center;
`
const Item_animal = styled.li`

margin:5px;
background-color:#ffffffab;
border-radius: 4px;
width:100%;
max-width:300px;
padding: 10px;
`
const Description_animal = styled.p`
text-align: center;
`
const Title_animal = styled.h3`
text-align: center;
text-transform: capitalize;
`
const Cont_button = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`
const Buttons = styled.button`
border-style: none;
border-radius: 7px;
background-color:whitesmoke;
margin: 5px;
padding: 10px!important;
font-size: 20px;
text-transform: capitalize;
&:hover{
    background-color:black;
    color:whitesmoke;
    transition:1s;
}
`
const Select_update = styled.select`
border-style: none;
border-radius:7px;
text-align: center;
margin-left:20px;
`
const Label_text = styled.label`
color:white;
margin-top:5px;
text-align: center;
margin-right: 3px;
font-size: 25px;
text-transform: capitalize;
`
const Animals = () => {
    const { user } = useContext(UserContext);
    const [animals, setAnimals] = useState([]);
    const [filter, setFilter] = useState({ text: "", option: null });
    const [filteredList, setFilteredList] = useState([]);
    const [families, setFamilies] = useState([]);
    const updateForm = useFormik({
        initialValues:{
            _id:"",
            id:"",
            name:"",
            isCarnivore:false,
            family:""
        },
        onSubmit: async (values) => {
            try{
                await UpdateAnimal(values);
                alert("animal modicado")
                getAnimals();
                updateForm.resetForm()
            }catch(err){
                alert(err);
            }
        }
    })
    const getAnimal = async (id) => {
        try {
            console.log("entra")
            const { data } = await GetAnimal(id)
            updateForm.values._id=data.animal._id;
            updateForm.values.id=data.animal.id;
            updateForm.values.name=data.animal.name;
            updateForm.values.isCarnivore=data.animal.isCarnivore;
            updateForm.values._id=data.animal._id
            updateForm.values.family=data.animal.family._id
            updateForm.handleReset()
        } catch (err) { alert(err.message) }
    }
    const getFamilies = async () => {
        try {
            const { data } = await GetFamilies();
            setFamilies(data.families.map(({ _id, name }) => ({ _id, name })))

        } catch (err) {
            alert(err);
        }
    }
    const getAnimals = async () => {
        try {
            const { data } = await GetAnimals();
            setAnimals(data.animals)
        } catch (err) {
            alert(err);
        }
    }
    const deleteAnimal = async (id) => {
        try {
            await DeleteAnimal(id);
            alert("animal Borrado")
            getAnimals();
        } catch (err) {
            alert(err);
        }

    }
    const listFiltered = () => {
        if (filter.text != "" && filter.option == false) {
            setFilteredList(animals.filter(animal => animal.name.toLowerCase().includes(filter.text.trim().toLowerCase()) && animal.family.livingInGroup == filter.option));
        } else if (filter.text != "" && filter.option == true) {
            setFilteredList(animals.filter(animal => animal.name.toLowerCase().includes(filter.text.trim().toLowerCase()) && animal.family.livingInGroup == filter.option))
        } else if (filter.text != "" && filter.option == null) {
            setFilteredList(animals.filter(animal => animal.name.toLowerCase().includes(filter.text.trim().toLowerCase())));
        } else if (filter.option == false && filter.text == "") {
            setFilteredList(animals.filter(animal => animal.family.livingInGroup == false));
        } else if (filter.option == true && filter.text == "") {
            setFilteredList(animals.filter(animal => animal.family.livingInGroup == true));
        }
    }
    const handleInput = (ev) => {
        const { name, value } = ev.target;
        if (name == "text") {
            setFilter({ ...filter, [name]: value })
        } else {
            setFilter({ ...filter, [name]: value == "true" ? true : (value == "false" ? false : null) })
        }

    }
    useEffect(() => { getAnimals(); listFiltered(); getFamilies(); }, [filter])
    return (
        <div>
            <Formulario_filter>
                <Input_filter type="text" name="text" onChange={handleInput} />
                <Select_text >viven en grupo
                    <Select_filter name="option" onChange={handleInput}>
                        <option value={null} >-</option>
                        <option value={true} >si</option>
                        <option value={false}>no</option>
                    </Select_filter>
                </Select_text>
            </Formulario_filter>
            ´{!filter.text && filter.option == null ?
                <>
                    <div >
                        <Title_list>lista de animales</Title_list>
                        <List_animals >
                            {animals.map(animal => (
                                <Item_animal key={animal._id}>
                                    <Link exact to={`/animal/${animal.id}`} style={{ "text-decoration": "none", "color": "black" }}>
                                        <Title_animal> {animal.name}</Title_animal>
                                        <Description_animal> Carnivoro : {animal.isCarnivore ? "si" : "no"}</Description_animal>
                                        <Description_animal> Familia: {animal.family.name}</Description_animal>
                                        <Description_animal> Viven en grupo: {animal.family.livingInGroup ? "si" : "no"}</Description_animal>
                                    </Link>
                                    <Cont_button>
                                        {user.role == "admin" ?
                                            <>
                                                <Buttons data-bs-toggle="modal" onClick={() => { getAnimal(animal.id) }} data-bs-target="#updateAnimal">Editar</Buttons>
                                                <Buttons type="button" onClick={()=>{deleteAnimal(animal._id)}}>Eliminar</Buttons>
                                            </>
                                            : null}
                                    </Cont_button>
                                </Item_animal>
                            ))}
                        </List_animals>
                    </div>
                </> 
                : <>
                    <div >
                        <Title_list>Coincidencias</Title_list>
                        <List_animals>
                            {filteredList.length == 0 ? <Title_list>No hay </Title_list> : null}
                            {filteredList.map(animal => (
                                <Item_animal key={animal._id}>
                                    <Link exact to={`/animal/${animal.id}`} style={{ "text-decoration": "none", "color": "black" }}>
                                        <Title_animal> {animal.name}</Title_animal>
                                        <Description_animal> Carnivoro : {animal.isCarnivore ? "si" : "no"}</Description_animal>
                                        <Description_animal> Familia: {animal.family.name}</Description_animal>
                                        <Description_animal> Viven en grupo: {animal.family.livingInGroup ? "si" : "no"}</Description_animal>
                                    </Link>
                                    <Cont_button>
                                        {user.role == "admin" ?
                                            <>
                                                <Buttons data-bs-toggle="modal"onClick={() => { getAnimal(animal.id) }} data-bs-target="#updateAnimal">Editar</Buttons>
                                                <Buttons type="button" onClick={()=>{deleteAnimal(animal._id)}}>Eliminar</Buttons>
                                            </>
                                            : null}
                                    </Cont_button>
                                </Item_animal>
                            ))}

                        </List_animals>
                    </div></>}

            {updateForm.values?
            <>
            <div class="modal fade" id="updateAnimal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class=" modal-content">
                        <div class="modal-header ">
                            <h5 class="modal-title" id="exampleModalLabel">Animal update</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={updateForm.handleSubmit} >
                                <input name="_id" type="text"onChange={updateForm.handleChange} value={updateForm.values._id} readOnly hidden />
                                <input name="id" type="number" onChange={updateForm.handleChange} value={updateForm.values.id} placeholder="id" />
                                <input name="name" type="text" onChange={updateForm.handleChange} value={updateForm.values.name} placeholder="Name" />
                                <Label_text >Carnivoro
                                    <Select_update class="input__selectF" name="isCarnivore"onChange={updateForm.handleChange}  value={updateForm.values.isCarnivore}>
                                        <option value={true}>si</option>
                                        <option value={false}>no</option>
                                    </Select_update>
                                </Label_text>
                                <Label_text>Familia
                                    <Select_update name="familiy"onChange={updateForm.handleChange}  value={updateForm.values.family}>
                                        {families.map((f) => (
                                            <option value={f._id}> {f.name}</option>
                                        ))}
                                    </Select_update>
                                </Label_text>
                                <button type="submit" data-bs-dismiss="modal">Modificar Animal</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            </>:null}
           

        </div>
    )
}

export default Animals
