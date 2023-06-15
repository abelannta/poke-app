import axios from "axios";
import { GET_POKEMON } from "../urlApi";

export const getPokemon = async ({ limit, offset }) => {
  console.log({ limit: limit, offset: offset });
  const res = await axios.get(GET_POKEMON, {
    params: {
      limit: limit,
      offset: offset,
    },
  });

  return res.data;
};
