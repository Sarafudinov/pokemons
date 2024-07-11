import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFetchPokemons from '../hooks/useFetchPokemon';
import Loader from './Loader';
import PokemonCard from './PokemonCard';

export default function PokemonList() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const { data: pokemons, loading, error, fetchNextPage } = useFetchPokemons(url);

    const handleLoadMoreClick = (event) => {
        event.preventDefault(); // Prevents the default browser reload
        fetchNextPage(); // Call the fetchNextPage function from useFetchPokemons
    };

    if (loading && !pokemons.length) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='pokemon-list'>
            {pokemons.map((pokemon) => (
                <PokemonCard 
                    key={uuidv4()}
                    name={pokemon.name} 
                    url={pokemon.url} />
            ))}
            {loading && <Loader />}
            {!loading && (
                <button onClick={handleLoadMoreClick} className='load-more'>
                    Load More
                </button>
            )}
        </div>
    );
}
