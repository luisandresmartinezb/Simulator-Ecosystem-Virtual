import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Species } from '../models/species';

@Injectable({
  providedIn: 'root'
})
export class EcosystemService {

  private species: Species[] = [
    { id: 1, name: 'Lobo Gris', type: 'Carnívoro', population: 50, reproductionRate: 20, conservationStatus: 'Media' },
    { id: 2, name: 'Ciervo Rojo', type: 'Herbívoro', population: 120, reproductionRate: 15, conservationStatus: 'Saludable' },
    { id: 3, name: 'Roble Común', type: 'Planta', population: 200, reproductionRate: 30, conservationStatus: 'Saludable' },
    { id: 4, name: 'Águila Real', type: 'Carnívoro', population: 15, reproductionRate: 10, conservationStatus: 'Crítico' },
    { id: 5, name: 'Zorro Rojo', type: 'Carnívoro', population: 35, reproductionRate: 25, conservationStatus: 'Media' },
    { id: 6, name: 'Pino Silvestre', type: 'Planta', population: 150, reproductionRate: 20, conservationStatus: 'Saludable' },
    { id: 7, name: 'Conejo Europeo', type: 'Herbívoro', population: 80, reproductionRate: 40, conservationStatus: 'Media' },
    { id: 8, name: 'Ciervo Volador', type: 'Herbívoro', population: 60, reproductionRate: 25, conservationStatus: 'Media' },
    { id: 9, name: 'Lirios del Agua', type: 'Planta', population: 100, reproductionRate: 35, conservationStatus: 'Saludable' },
    { id: 10, name: 'Búho Común', type: 'Carnívoro', population: 20, reproductionRate: 15, conservationStatus: 'Crítico' }
  ];

  getSpecies(): Observable<Species[]> {
    // Devuelve copia para evitar mutaciones raras desde componentes
    return of([...this.species]);
  }

  addSpecie(specie: Species): Observable<Species> {
    const newId = this.getNextId();
    const newSpecie: Species = { ...specie, id: newId };
    this.species.push(newSpecie);
    return of(newSpecie);
  }

  updateSpecies(updated: Species): Observable<Species> {
    const index = this.species.findIndex(s => s.id === updated.id);

    // Si no existe, no revienta
    if (index === -1) {
      return of(updated);
    }

    this.species[index] = { ...updated };
    return of(this.species[index]);
  }

  deleteSpecies(id: number): Observable<void> {
    this.species = this.species.filter(s => s.id !== id);
    return of(void 0);
  }

  private getNextId(): number {
    return this.species.length ? Math.max(...this.species.map(s => s.id)) + 1 : 1;
  }
}
