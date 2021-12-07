import React, { useState, useEffect ,useContext} from 'react'
import { useParams } from "react-router-dom"
import { GetAnimal } from "../../../api/fetch_animals"
import { UserContext } from '../../../App'
import styled from "styled-components"
const Contenedor=styled.div`
margin-top:3%;
display: flex;
justify-content: center;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
padding: 10px;
`
const Title_Detail=styled.h1`
text-transform: uppercase;
margin-bottom: 20px;
text-align: center;
font-size:50px;
`
const Contenedor_info= styled.div`
display: flex;
justify-content: center;
width: 40%;
max-width: 80%;
`
const Description_detail= styled.p`
text-align: justify;
font-size: 25px;
`
const Map= styled.iframe`
width:420px;
height:300px;
margin-bottom:20px;
`
const AnimalsDetail = () => {
    const {user} =useContext(UserContext)
    const { id } = useParams();
    const INITIAL_VALUES = {
        id: "",
        name: "",
        isCarnivore: false,
        family: {
            name: "",
            livingInGroup: false,
            habitat: {
                name: "",
                mode: "",
                location: ""
            }
        }
    }
    const [animal, setAnimal] = useState(INITIAL_VALUES)

    const getAnimal = async () => {
        try {
            const res = await GetAnimal(id);
            setAnimal(res.data.animal)
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(() => { getAnimal() }, [])
    return (
        <div>
            <Contenedor>
                <Title_Detail>{animal.name}</Title_Detail>
                <Contenedor_info >
                    <Description_detail > Es un animal que proviene de la familia {animal.family.name}
                        Este tipo de animal {animal.isCarnivore ? "es carnivoro" : "no es carnivoro"}
                        y Normalmente {animal.family.livingInGroup ? "viven en grupos de su misma especie" : "no viven en grupos de su misma especie"}.
                        estos animales son de tipo {animal.family.habitat.mode == "Mar" ? "Acuaticos" : ""}
                        {animal.family.habitat.mode === "Tierra" ? "Terrestres" : ""}
                        {animal.family.habitat.mode === "Aire" ? "Areos" : ""}
                        el habitat comun de estos animales son {animal.family.habitat.name}
                        mas o menos en esta posicion {animal.family.habitat.location}
                    </Description_detail>
                </Contenedor_info>
                <Map
                    id="gmap_canvas"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(animal.family.habitat.location.trim())}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                ></Map>
            </Contenedor>
        </div>
    )
}

export default AnimalsDetail
