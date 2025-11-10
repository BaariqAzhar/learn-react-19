import { Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokemon from './components/Pokemon';
import PokemonV1 from './components/PokemonV1';
import PokemonV2 from './components/PokemonV2';
import PokemonUseTransitionV1 from './components/PokemonUseTransitionV1';

function App() {
  const promise = fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
    .then(res => res.ok ? res.json() : Promise.reject('Failed to load Pokémon data'));

  return (
    <>
      <Suspense fallback={<p>Loading PokemonUseTransitionV1 …</p>}>
        <PokemonUseTransitionV1 />
      </Suspense>
      <Suspense fallback={<p>Loading Pokémon…</p>}>
        <Pokemon name="pikachu" />
      </Suspense>
      <Suspense fallback={<p>Loading Pokémon 1…</p>}>
        <PokemonV1 />
      </Suspense>
      <Suspense fallback={<p>Loading Pokémon 2…</p>}>
        <PokemonV2 data={promise} />
      </Suspense>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
