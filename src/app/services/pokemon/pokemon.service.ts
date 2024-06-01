import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  delay,
  forkJoin,
  map,
  Observable,
  of,
  switchMap
} from "rxjs";
import { environment } from "src/environments/environment";
import {
  Chain,
  IEvolutionChain,
  IGenerationResponse,
  IPokemonApi,
  IPokemonNameUrl,
  IPokemonSpecies,
  Stat,
  Type
} from "../../interfaces/pokemon-api.interface";
import { IPokemon } from "../../interfaces/pokemon.interface";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  pokemonSelected$: BehaviorSubject<IPokemon | null> =
    new BehaviorSubject<IPokemon | null>(null);

  constructor(private _http: HttpClient) {}

  getPokemons(generation: number): Observable<IPokemon[]> {
    return this._http
      .get<IGenerationResponse>(
        `${environment.apiUrl}/generation/${generation}`
      )
      .pipe(
        delay(2000),
        map((generation: IGenerationResponse) =>
          this.sortingPokemon(generation.pokemon_species)
        ),
        switchMap((pokemons: IPokemonNameUrl[]) =>
          this.getEvolutionUrl(pokemons)
        ),
        switchMap((pokemons: IPokemon[]) => this.getEvolution(pokemons)),
        switchMap((pokemons: IPokemon[]) => this.getPokemon(pokemons)),
        map((pokemons: IPokemon[]) => this.findPokemonCurrent(pokemons))
      );
  }

  // THIS IS FOR API AWS CUSTOM
  getPokemonsAws(generation: number): Observable<IPokemon[]> {
    return this._http
      .get<
        IPokemon[]
      >(generation === 1 ? `${environment.aws.apiFirst}` : `${environment.aws.apiSecond}`)
      .pipe(delay(2000));
  }

  sortingPokemon(pokemons: IPokemonNameUrl[]): IPokemonNameUrl[] {
    return pokemons.sort((a: IPokemonNameUrl, b: IPokemonNameUrl) => {
      const numA = parseInt(a.url.match(/\/(\d+)\/$/)![1]);
      const numB = parseInt(b.url.match(/\/(\d+)\/$/)![1]);
      return numA - numB;
    });
  }

  getEvolutionUrl(pokemons: IPokemonNameUrl[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemonNameUrl) => {
        return this._http.get<IPokemonSpecies>(pokemon.url).pipe(
          map((res: IPokemonSpecies) => {
            return {
              ...pokemon,
              evolution_url: res.evolution_chain.url ?? null
            };
          })
        );
      })
    );
  }

  getEvolution(pokemons: IPokemon[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemon) => {
        return this._http.get<IEvolutionChain>(pokemon.evolution_url!).pipe(
          map((evolutions: IEvolutionChain) =>
            this.extractEvolutions(evolutions.chain)
          ),
          map((evolutions: string[]) => {
            return {
              ...pokemon,
              evolutions
            };
          })
        );
      })
    );
  }

  extractEvolutions(chain: Chain, speciesArray: string[] = []): string[] {
    speciesArray.push(chain.species.name);
    chain.evolves_to.forEach((evolution: Chain) => {
      this.extractEvolutions(evolution, speciesArray);
    });
    return speciesArray;
  }

  getPokemon(pokemons: IPokemon[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemon) => {
        if (!pokemon.evolutions || pokemon.evolutions.length === 0) {
          return of({
            ...pokemon,
            evolution_data: []
          });
        }
        const evolutionRequests: Observable<IPokemonApi>[] =
          pokemon.evolutions.map((evolution: string) =>
            this._http.get<IPokemonApi>(
              `${environment.apiUrl}/pokemon/${evolution}`
            )
          );
        return forkJoin(evolutionRequests).pipe(
          map((evolution_data: IPokemonApi[]) => ({
            ...pokemon,
            evolution_data
          }))
        );
      })
    );
  }

  findPokemonCurrent(pokemons: IPokemon[]) {
    return pokemons.map((pokemon: IPokemon) => {
      const find: IPokemonApi = pokemon.evolution_data!.find(
        (evolution: IPokemonApi) => evolution.name === pokemon.name
      )!;
      return {
        ...pokemon,
        info: find
      };
    });
  }

  generateApiPokemon(pokemons: IPokemon[]): IPokemon[] {
    return pokemons.map((pokemon: IPokemon) => {
      const info: IPokemonApi | undefined = pokemon.info;
      const stats: Stat[] = info?.stats ?? [];
      const mappedStats: Stat[] = stats.map((stat) => ({
        base_stat: stat.base_stat ?? 0,
        stat: { name: stat.stat.name, url: "" }
      }));
      const types: Type[] = info?.types ?? [];
      const mappedTypes: Type[] = types.map((type) => ({
        type: {
          name: type.type.name,
          url: ""
        }
      }));
      const evolutions: IPokemonApi[] =
        pokemon.evolution_data?.map((evolution: IPokemonApi) => ({
          height: evolution?.height ?? 0,
          id: evolution?.id ?? 0,
          name: evolution?.name ?? "",
          sprites: {
            other: {
              home: {
                front_default:
                  evolution?.sprites?.other?.home?.front_default ?? ""
              }
            }
          },
          stats:
            evolution?.stats?.map((stat) => ({
              base_stat: stat.base_stat ?? 0,
              stat: { name: stat.stat.name, url: "" }
            })) ?? [],
          types:
            evolution?.types.map((type) => ({
              type: {
                name: type.type.name,
                url: ""
              }
            })) ?? [],
          weight: evolution?.weight ?? 0
        })) ?? [];
      return {
        name: pokemon.name,
        url: pokemon.url,
        info: {
          height: info?.height ?? 0,
          id: info?.id ?? 0,
          name: info?.name ?? "",
          sprites: {
            other: {
              home: {
                front_default: info?.sprites?.other?.home?.front_default ?? ""
              }
            }
          },
          stats: mappedStats,
          types: mappedTypes,
          weight: info?.weight ?? 0
        },
        color: "",
        evolution_data: evolutions
      };
    });
  }

  // OBS
  getPokemonSelected(): Observable<IPokemon | null> {
    return this.pokemonSelected$.asObservable();
  }

  setPokemonSelected(pokemon: IPokemon | null): void {
    this.pokemonSelected$.next(pokemon);
  }
}
