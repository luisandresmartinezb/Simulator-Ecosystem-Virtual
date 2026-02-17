import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conservationStatus',
  standalone: true, // si estás en Standalone
})
export class ConservationStatusPipe implements PipeTransform {

  transform(status: string | null | undefined): string {
    switch (status) {
      case 'Saludable': return 'green';
      case 'Media': return 'orange';
      case 'Crítico': return 'red';
      default: return 'black';
    }
  }
}
