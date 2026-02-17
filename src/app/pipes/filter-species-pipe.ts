import { Pipe, PipeTransform } from '@angular/core';
import { Species } from '../models/species';

@Pipe({
  name: 'filterSpecies',
  standalone: true
})
export class FilterSpeciesPipe implements PipeTransform {

  transform(
    species: Species[] | null | undefined,
    type: string,
    status: string
  ): Species[] {

    if (!species) return [];

    return species.filter(s =>
      (type ? s.type === type : true) &&
      (status ? s.conservationStatus === status : true)
    );
  }

}
