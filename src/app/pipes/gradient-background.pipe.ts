import { Pipe, PipeTransform } from "@angular/core";
import { Rgb } from "../interfaces/colors.interface";

@Pipe({
  name: "gradientBackground",
  standalone: true
})
export class GradientBackgroundPipe implements PipeTransform {
  transform(color?: string | number | Rgb): string {
    if (color) {
      const colorMapType: Rgb = color as Rgb;
      const [rX2, gX2, bX2]: number[] = this.darkenColor(
        [colorMapType[0], colorMapType[1], colorMapType[2]],
        0.2
      );
      const [rX4, gX4, bX4]: number[] = this.darkenColor(
        [colorMapType[0], colorMapType[1], colorMapType[2]],
        0.4
      );
      const [rX6, gX6, bX6]: number[] = this.darkenColor(
        [colorMapType[0], colorMapType[1], colorMapType[2]],
        0.6
      );
      const [rX8, gX8, bX8]: number[] = this.darkenColor(
        [colorMapType[0], colorMapType[1], colorMapType[2]],
        0.8
      );
      const colorFilled: string = `
      linear-gradient(
        0deg,
        rgb(${rX8}, ${gX8}, ${bX8}) 0%,
        rgb(${rX6}, ${gX6}, ${bX6}) 10%,
        rgb(${rX4}, ${gX4}, ${bX4}) 20%,
        rgb(${rX2}, ${gX2}, ${bX2}) 30%,
        rgb(${colorMapType[0]}, ${colorMapType[1]}, ${colorMapType[2]}) 50%
      )`;
      return color ? colorFilled : "rgb(0, 0, 0)";
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
