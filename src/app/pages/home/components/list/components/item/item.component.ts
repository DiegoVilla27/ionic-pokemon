import { NgFor, NgIf, NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { prominent } from "color.js";
import { Color } from "src/app/interfaces/colors.interface";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { ColorTypePipe } from "src/app/pipes/color-type.pipe";
import { GradientBackgroundPipe } from "src/app/pipes/gradient-background.pipe";
import { IconTypePipe } from "src/app/pipes/icon-type.pipe";
import { PokemonService } from "src/app/services/pokemon/pokemon.service";
import { SkeletonComponent } from "./components/skeleton/skeleton.component";

@Component({
  selector: "poke-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    GradientBackgroundPipe,
    ColorTypePipe,
    IconTypePipe,
    SkeletonComponent
  ]
})
export class ItemComponent implements OnInit {
  @Input() pokemon!: IPokemon;
  loading: boolean = true;

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.addColorPokemon();
  }

  async addColorPokemon(): Promise<void> {
    await this.setColorBG(this.pokemon);
  }

  async setColorBG(pokemon: IPokemon): Promise<void> {
    const { info } = pokemon;
    const { sprites } = info!;
    const { other } = sprites;
    const { home } = other!;
    const { front_default } = home;
    await prominent(front_default).then((color: Color) => {
      this.loading = false;
      return (this.pokemon.color = color[1]);
    });
  }

  selectPokemon(pokemon: IPokemon): void {
    this._pokemonSvc.setPokemonSelected(pokemon);
  }
}
