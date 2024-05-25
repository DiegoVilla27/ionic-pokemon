import { Pipe, PipeTransform } from "@angular/core";
import { EColors, IMapColors } from "../interfaces/colors.interface";

@Pipe({
  name: "colorType",
  standalone: true
})
export class ColorTypePipe implements PipeTransform {
  transform(name: string): object {
    const types: IMapColors = {
      "normal": EColors.normal,
      "fighting": EColors.fighting,
      "flying": EColors.flying,
      "poison": EColors.poison,
      "ground": EColors.ground,
      "rock": EColors.rock,
      "bug": EColors.bug,
      "ghost": EColors.ghost,
      "steel": EColors.steel,
      "fire": EColors.fire,
      "water": EColors.water,
      "grass": EColors.grass,
      "electric": EColors.electric,
      "psychic": EColors.psychic,
      "ice": EColors.ice,
      "dragon": EColors.dragon,
      "dark": EColors.dark,
      "fairy": EColors.fairy
    };
    return { "background-color": types[name] };
  }
}
