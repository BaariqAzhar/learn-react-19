import { use } from 'react'

type PokemonResponse = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
  }
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
}

const pokemonCache = new Map<string, Promise<PokemonResponse>>()

const fetchPokemon = (name: string) => {
  const key = name.toLowerCase()

  if (!pokemonCache.has(key)) {
    // Cache the fetch promise so React's `use` hook can reuse it across renders.
    const request = fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load Pokémon "${name}"`)
        }

        return response.json() as Promise<PokemonResponse>
      })

    pokemonCache.set(key, request)
  }

  return pokemonCache.get(key)!
}

type PokemonProps = {
  name: string
}

function Pokemon({ name }: PokemonProps) {
  const pokemon = use(fetchPokemon(name))

  return (
    <section className="pokemon-card">
      <h2>{pokemon.name}</h2>
      {pokemon.sprites.front_default ? (
        <img
          alt={pokemon.name}
          height={96}
          src={pokemon.sprites.front_default}
          width={96}
        />
      ) : (
        <p>No sprite available.</p>
      )}
      <dl>
        <dt>Height</dt>
        <dd>{pokemon.height}</dd>
        <dt>Weight</dt>
        <dd>{pokemon.weight}</dd>
        <dt>Types</dt>
        <dd>
          {pokemon.types.map(({ type }) => type.name).join(', ')}
        </dd>
      </dl>
    </section>
  )
}

export default Pokemon
