import React from "react";
import PokemonItem from "../pokemonCard";

function PokemonList({ pokemon, setOpenModal }) {
  return (
    <>
      {pokemon?.map((item, i) => (
        <div onClick={() => setOpenModal(true)}>
          <PokemonItem item={item} key={i} />
        </div>
      ))}
    </>
  );
}

export default PokemonList;
