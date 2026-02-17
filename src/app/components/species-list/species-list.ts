import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Species } from '../../models/species';
import { FilterSpeciesPipe } from '../../pipes/filter-species-pipe';
import { PopulationFormatPipe } from '../../pipes/population-format-pipe';
import { ConservationStatusPipe } from '../../pipes/conservation-status-pipe';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, FilterSpeciesPipe, PopulationFormatPipe, ConservationStatusPipe],
  templateUrl: './species-list.html',
  styleUrl: './species-list.css'
})
export class SpeciesListComponent {

  @Input() species: Species[] = [];
  @Input() typeFilter = '';
  @Input() statusFilter = '';
  @Input() searchText = '';
  @Output() deleteId = new EventEmitter<number>();
  @Output() reproduceId = new EventEmitter<number>();
  @Output() editId = new EventEmitter<number>();

  delete(id: number) {
    this.deleteId.emit(id);
  }

  reproduce(id: number) {
    this.reproduceId.emit(id);
  }

  edit(id: number) {
    this.editId.emit(id);
  }



  getImage(name: string): string {
    switch (name) {
      case 'Lobo Gris': return 'wolf.jpg';
      case 'Ciervo Rojo': return 'deer.jpg';
      case 'Roble Común': return 'oak.jpg';
      case 'Águila Real': return 'eagle.jpg';
      case 'Zorro Rojo': return 'fox.jpg';
      case 'Pino Silvestre': return 'pine.jpg';
      case 'Conejo Europeo': return 'rabbit.jpg';
      case 'Ciervo Volador': return 'beetle.jpg';
      case 'Lirios del Agua': return 'lily.jpg';
      case 'Búho Común': return 'owl.jpg';


      //Añadir un nuevo animal pescado
      case 'pescado': return 'fish.jpg';

      default: return 'default.jpg';

    }
  }

  badgeClass(status?: Species['conservationStatus']) {
    return {
      healthy: status === 'Saludable',
      medium: status === 'Media',
      critical: status === 'Crítico'
    };
  }
}
