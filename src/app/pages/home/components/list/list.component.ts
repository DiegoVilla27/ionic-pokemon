import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IPokemon } from "src/app/interfaces/pokemon.interface";
import { ItemComponent } from "./components/item/item.component";

@Component({
  selector: "poke-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: true,
  imports: [NgFor, ItemComponent]
})
export class ListComponent {
  @Input() pokemons: IPokemon[] = [];
}
