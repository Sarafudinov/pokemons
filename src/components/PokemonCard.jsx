import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PokemonCard({name, url}) {
    const [pokemonData, setPokemonData] = useState(null)

    useEffect(() => {
        const 
            fetchData = async () => {
            try {
                const response = await axios.get(url)
                setPokemonData(response.data)
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
        fetchData();
    }, [url])
  return (
    <div className='pokemon-card'>
        <h3>{name}</h3>
        {pokemonData && (
            <div className='pokemon-details'>
                <img src={pokemonData.sprites.front_default} alt={name} />
                <p>Height: {pokemonData.height}</p>
                <p>Weight: {pokemonData.weight}</p>
                <p>Base Experience: {pokemonData.base_experience}</p>
            </div>
        )}
    </div>
  )
}
