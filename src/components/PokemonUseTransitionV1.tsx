import { useEffect, useState, useTransition } from "react";

const CHARMANDER_LIST = ['charmander', 'charmeleon', 'charizard'];

const PokemonUseTransitionV1 = () => {
    const [count, setCount] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [pokemonData, setPokemonData] = useState();

    const fetchPokemonData = async () => {
        startTransition(async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${CHARMANDER_LIST[count]}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemonData(data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        });
    };

    const handleUpgrade = () => {
        setCount((prev) => {
            if (prev >= CHARMANDER_LIST.length - 1) {
                return 0;
            }
            return prev + 1
        });
    }

    useEffect(() => {
        fetchPokemonData();
    }, [count]);

    return (
        <>
            <div>PokemonUseTransitionV1 Component</div>
            <button disabled={isPending} onClick={handleUpgrade}>{count === CHARMANDER_LIST.length - 1 ? 'restart' : 'upgrade'}</button>
            {isPending ? (
                <p>Loading Pokémon data...</p>
            ) : <div>
                <h2>{pokemonData?.name}</h2>
                <img
                    alt={pokemonData?.name}
                    height={96}
                    src={pokemonData?.sprites?.front_default}
                    width={96}
                />
            </div>}
            <hr />
        </>
    );
};

export default PokemonUseTransitionV1;