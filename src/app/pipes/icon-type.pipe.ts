import { Pipe, PipeTransform } from "@angular/core";
import { IDictionaryString } from "../interfaces/general.interface";

@Pipe({
  name: "iconType",
  standalone: true
})
export class IconTypePipe implements PipeTransform {
  url: string = "assets/images/types";

  transform(name: string): string {
    const types: IDictionaryString = {
      "normal": `${this.url}/normal.svg`,
      "fighting": `${this.url}/fighting.svg`,
      "flying": `${this.url}/flying.svg`,
      "poison": `${this.url}/poison.svg`,
      "ground": `${this.url}/ground.svg`,
      "rock": `${this.url}/rock.svg`,
      "bug": `${this.url}/bug.svg`,
      "ghost": `${this.url}/ghost.svg`,
      "steel": `${this.url}/steel.svg`,
      "fire": `${this.url}/fire.svg`,
      "water": `${this.url}/water.svg`,
      "grass": `${this.url}/grass.svg`,
      "electric": `${this.url}/electric.svg`,
      "psychic": `${this.url}/psychic.svg`,
      "ice": `${this.url}/ice.svg`,
      "dragon": `${this.url}/dragon.svg`,
      "dark": `${this.url}/dark.svg`,
      "fairy": `${this.url}/fairy.svg`
    };
    return types[name];
  }
}
