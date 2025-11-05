'use client';

import { use } from "react";


const PokemonV2 = ({ data }) => {
    const response = use(data);
    console.log('response', response);


    return (
        <>
            <div>PokemonV2 Component</div>
            {response ? (
                <div>
                    <h2>{response?.name}</h2>
                    <img
                        alt={response?.name}
                        height={96}
                        src={response?.sprites?.front_default}
                        width={96}
                    />
                </div>
            ) : (
                <p>Loading Pokémon data...</p>
            )}
        </>
    );
}

export default PokemonV2;