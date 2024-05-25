import { Pipe, PipeTransform } from "@angular/core";
import { Rgb } from "../interfaces/colors.interface";

@Pipe({
  name: "colorBackground",
  standalone: true
})
export class ColorBackgroundPipe implements PipeTransform {
  transform(color?: string | number | Rgb): string {
    if (color) {
      const colorMapType: Rgb = color as Rgb;
      return `rgb(${colorMapType[0]}, ${colorMapType[1]}, ${colorMapType[2]})`;
    }
    return "rgb(0, 0, 0)";
  }

  darkenColor(color: Rgb, percentage: number): number[] {
    let r: number = color[0];
    let g: number = color[1];
    let b: number = color[2];

    // Reducir cada color según el porcentaje proporcionado
    r = Math.round(r * (1 - percentage));
    g = Math.round(g * (1 - percentage));
    b = Math.round(b * (1 - percentage));

    // Asegurarse de que los valores estén en el rango correcto (0 - 255)
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Devolver el nuevo color oscurecido como un array [r, g, b]
    return [r, g, b];
  }
}
