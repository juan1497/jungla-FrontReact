import React from 'react'
import styled from 'styled-components'
const Image=styled.header`
    background-image: url(https://besthqwallpapers.com/Uploads/30-1-2018/38794/thumb2-lions-4k-jungle-wildlife-predators.jpg);
    min-height: 100vh;
    // background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`
const Title=styled.h1`
color: white;
text-align: center;
`
const Contenedor=styled.div`
max-width: 90%;
text-align: center;
`
const Text=styled.p`
text-align: center;
padding: 10px;
margin-left: 200px;
color:white;
text-align: justify;
font-size:30px;
@media (max-width: 600px) {
    text-align: center;
    padding: 10px;
    margin-left: 40px;
    margin-top: 100px;
    color:aliceblue;
    text-align: justify;
    font-size:18px;
}
`
const Home = () => {
    return (
        <>
            <Image>
                <Title>The Jungle</Title>
                <Contenedor>
                    <Text>El mundo está lleno de animales de especies asombrosas y diversas.¿Sientes curiosidad por conocer todos ellos?
                    Si es así, estás en el sitio correcto.Esta app te enseña todos los animales que puedas imaginar,
                    además de detalles que quizás no conocías sobre ellos.Conviértete en un experto y como dirían los Guns n' Roses: WELCOME TO THE JUNGLE!</Text>
                </Contenedor>
            </Image>
        </>
    )
}

export default Home
