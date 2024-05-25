import { Rgb } from "./colors.interface";
import { IPokemonApi } from "./pokemon-api.interface";

// POKEMON
export interface IPokemon {
  name: string;
  url: string;
  info?: IPokemonApi;
  evolutions?: string[];
  evolution_url?: string;
  evolution_data?: IPokemonApi[];
  color?: string | number | Rgb;
}
