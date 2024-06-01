import { NgFor, NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
  IonButton
} from "@ionic/angular/standalone";
import { Subject, takeUntil } from "rxjs";
import { DisplayItemComponent } from "src/app/components/display-item/display-item.component";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { setStatusBar } from "src/app/helpers/status-bar/status-bar.helper";
import { TPlatform } from "src/app/interfaces/general.interface";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { PlatformService } from "src/app/services/platform/platform.service";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { ChangeGenerationComponent } from "./components/change-generation/change-generation.component";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: "poke-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonToolbar,
    NgIf,
    NgFor,
    IonContent,
    IonHeader,
    SpinnerComponent,
    SearchComponent,
    ChangeGenerationComponent,
    DisplayItemComponent,
    ListComponent
  ]
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonContent) _content!: IonContent;
  @ViewChild(IonModal) modal!: IonModal;
  platform: TPlatform = "android";
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  pokemonSelected: IPokemon | null = null;
  generation: number = 1;
  loading: boolean = true;
  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _pokemonSvc: PokemonService,
    private _platformSvc: PlatformService
  ) {
    this._platformSvc
      .getPlatform()
      .pipe(takeUntil(this.destroy$))
      .subscribe((platform: TPlatform) => (this.platform = platform));
  }

  ngOnInit(): void {
    this.getPokemonSelected();
    this.getPokemons(this.generation);
  }

  close(): void {
    this._pokemonSvc.setPokemonSelected(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemons(generation: number): void {
    this.loading = true;
    setStatusBar("light");
    this._pokemonSvc
      .getPokemonsAws(generation)
      .subscribe((pokemons: IPokemon[]) => {
        this.pokemons = pokemons;
        this.pokemonsFiltered = pokemons;
        this.loading = false;
        setStatusBar("dark");
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

  scrollToTop() {
    this._content.scrollToTop(500);
  }
}
