import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "percentageStats",
  standalone: true
})
export class PercentageStatsPipe implements PipeTransform {
  transform(value: number): string {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    return `${clampedValue}%`;
  }
}
