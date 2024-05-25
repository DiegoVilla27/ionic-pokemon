import { Pipe, PipeTransform } from "@angular/core";
import { IDictionaryString } from "../interfaces/general.interface";

@Pipe({
  name: "nameStats",
  standalone: true
})
export class NameStatsPipe implements PipeTransform {
  transform(name: string): string {
    const names: IDictionaryString = {
      "hp": "Hp",
      "attack": "Attack",
      "defense": "Defense",
      "special-attack": "Sp. Atk",
      "special-defense": "Sp. Def",
      "speed": "Speed"
    };
    return names[name];
  }
}
