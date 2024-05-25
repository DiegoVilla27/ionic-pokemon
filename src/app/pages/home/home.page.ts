import { NgFor, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { Subject, takeUntil } from "rxjs";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { PokemonService } from "src/app/services/pokemon.service";
import { ChangeGenerationComponent } from "./components/change-generation/change-generation.component";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: "poke-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    IonContent,
    SpinnerComponent,
    SearchComponent,
    ChangeGenerationComponent,
    ListComponent
  ]
})
export class HomePage implements OnInit, OnDestroy {
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  pokemonSelected: IPokemon | null = null;
  generation: number = 1;
  loading: boolean = true;

  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonSelected();
    this.getPokemons(this.generation);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemons(generation: number): void {
    this.loading = true;
    this._pokemonSvc
      .getPokemons(generation)
      .subscribe((pokemons: IPokemon[]) => {
        this.pokemons = pokemons;
        this.pokemonsFiltered = pokemons;
        this.loading = false;
      });
  }

  filter(query: string): void {
    if (query.length > 0) {
      this.pokemonsFiltered = this.pokemons.filter((pokemon: IPokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.pokemonsFiltered = this.pokemons;
    }
  }

  getPokemonSelected(): void {
    this._pokemonSvc
      .getPokemonSelected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pokemon: IPokemon | null) => (this.pokemonSelected = pokemon)
      );
  }

  changeGeneration(generation: number): void {
    this.generation = generation;
    this.getPokemons(this.generation);
  }
}
