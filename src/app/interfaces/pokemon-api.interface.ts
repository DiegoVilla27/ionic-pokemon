// GENERATION
export interface IGenerationResponse {
  pokemon_species: IPokemonNameUrl[];
}
export interface IPokemonNameUrl {
  name: string;
  url: string;
}
export interface Name {
  language: IPokemonNameUrl;
  name: string;
}

// SPECIES
export interface IPokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

// EVOLUTION
export interface IEvolutionChain {
  chain: Chain;
}

export interface Chain {
  evolves_to: Chain[];
  species: IPokemonNameUrl;
}

// POKEMON
export interface IPokemonApi {
  height: number;
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Sprites {
  other?: Other;
}

export interface Other {
  home: Home;
}

export interface Home {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  stat: IPokemonNameUrl;
}

export interface Type {
  type: IPokemonNameUrl;
}
