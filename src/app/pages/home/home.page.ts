import { NgFor, NgIf } from "@angular/common";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { Subject, takeUntil } from "rxjs";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { setStatusBar } from "src/app/helpers/status-bar/status-bar.helper";
import { TPlatform } from "src/app/interfaces/general.interface";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { ChangeGenerationComponent } from "./components/change-generation/change-generation.component";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { PlatformService } from "src/app/services/platform/platform.service";

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
  @ViewChild("header") header!: ElementRef;
  @ViewChild("content") content!: ElementRef;
  platform: TPlatform = "android";
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  pokemonSelected: IPokemon | null = null;
  generation: number = 1;
  loading: boolean = true;
  currentHeader?: HTMLDivElement | null;
  currentHeaderHeight: number = 0;
  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _pokemonSvc: PokemonService,
    private _renderer: Renderer2,
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

  ngAfterViewChecked(): void {
    const header: HTMLDivElement | null =
      document.querySelector(".home-header");
    this.addPaddingToHeader(header);
    this.addPaddingToContent(header);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addPaddingToHeader(header: HTMLDivElement | null): void {
    if (header && header !== this.currentHeader) {
      if (this.platform === "ios") {
        this._renderer.setStyle(
          header,
          "cssText",
          `padding-top: var(--ion-safe-area-top, 0)`
        );
        this.currentHeader = header;
      }
    }
  }

  addPaddingToContent(header: HTMLDivElement | null): void {
    if (header) {
      const headerHeight: number = header.offsetHeight;
      if (
        header !== this.currentHeader ||
        headerHeight !== this.currentHeaderHeight
      ) {
        this._renderer.setStyle(
          this.content.nativeElement,
          "cssText",
          `padding-top: ${headerHeight}px`
        );
        this.currentHeader = header;
        this.currentHeaderHeight = headerHeight;
      }
    }
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
}
