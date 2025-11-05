import { useEffect, useState } from "react";

const PokemonV1 = () => {
    const [pokemonData, setPokemonData] = useState();

    const fetchPokemonData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    return (
        <>
            <div>PokemonV1 Component</div>
            {pokemonData ? (
                <div>
                    <h2>{pokemonData?.name}</h2>
                    <img
                        alt={pokemonData?.name}
                        height={96}
                        src={pokemonData?.sprites?.front_default}
                        width={96}
                    />
                </div>
            ) : (
                <p>Loading Pokémon data...</p>
            )}
        </>
    );
}

export default PokemonV1;