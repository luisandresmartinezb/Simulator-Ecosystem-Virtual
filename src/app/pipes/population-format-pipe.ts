import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'populationFormat',
})
export class PopulationFormatPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    const v = Number(value ?? 0);

    if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + 'b';
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'm';
    if (v >= 1000) return (v / 1000).toFixed(1) + 'k';

    return v.toString();
  }
}
