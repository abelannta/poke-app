import React from "react";
import PokemonItem from "../pokemonCard";

function PokemonList({ pokemon, setOpenModal, setPokemonModalData }) {
  const handleOnClick = (item) => {
    setPokemonModalData(item);
    setOpenModal(true);
  };

  return (
    <>
      {pokemon?.map((item, i) => (
        <div onClick={() => handleOnClick(item)} key={i}>
          <PokemonItem item={item} />
        </div>
      ))}
    </>
  );
}

export default PokemonList;
