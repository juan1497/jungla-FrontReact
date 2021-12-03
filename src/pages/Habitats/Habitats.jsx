import React, { useEffect, useState } from 'react'
import { GetHabitats } from "../../api/fetch_habitats"
import styled from 'styled-components'
const Title=styled.h1`
text-align: center;
`
const Listado=styled.ul`
list-style: none;
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top: 30px;
`
const Item = styled.li`
width: 100%;
max-width: 300px;
margin: 10px;
`
const Title_item=styled.h3`
text-align: center;

`
const Habitats = () => {
    const [habitats, setHabitats] = useState([])
    const getHabitats = async () => {
        try {
            const { data } = await GetHabitats();
            // setAnimals(data.animals)
            setHabitats(data.habitats)
        } catch (err) {
            alert(err);
        }
    }
    useEffect(() => { getHabitats() }, [])
    return (
        <div>
            <Title>Habitats</Title>
            <Listado>
                {habitats.map(habitat => (
                    <Item key={habitat.id}>
                        <Title_item>{habitat.name}</Title_item>
                        <iframe
                            width="300"
                            height="330"
                            id="gmap_canvas"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(habitat.location.trim())}&&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                        ></iframe>
                        {/* <p> {habitat.mode} {habitat.location}</p> */}
                    </Item>
                ))}
            </Listado>
        </div>
    )
}

export default Habitats
