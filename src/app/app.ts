import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcosystemService } from './services/ecosystem';
import { Species } from './models/species';
import { FilterComponent } from './components/filter/filter';
import { SpeciesFormComponent } from './components/species-form/species-form';
import { SpeciesListComponent } from './components/species-list/species-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterComponent,
    SpeciesFormComponent,
    SpeciesListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  species: Species[] = [];
  typeFilter = '';
  statusFilter = '';

  // Buscador
  searchText = '';

  // Editar
  selectedSpecies: Species | null = null;

  constructor(private ecosystemService: EcosystemService) { }

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    this.ecosystemService.getSpecies().subscribe(data => this.species = data);
  }

  onFiltersChange(filters: { type: string; status: string }): void {
    this.typeFilter = filters.type;
    this.statusFilter = filters.status;
  }

  onReproduce(id: number): void {
    const sp = this.species.find(s => s.id === id);
    if (!sp) return;

    const inc = Math.max(1, Math.round(sp.population * (sp.reproductionRate / 100)));
    const updated: Species = { ...sp, population: sp.population + inc };

    this.ecosystemService.updateSpecies(updated).subscribe(() => this.loadSpecies());
  }

  onDelete(id: number): void {
    const sp = this.species.find(s => s.id === id);
    const ok = confirm(`¿Seguro que deseas eliminar "${sp?.name ?? 'la especie'}"?`);
    if (!ok) return;

    this.ecosystemService.deleteSpecies(id).subscribe(() => this.loadSpecies());
  }

  onEdit(id: number): void {
    const sp = this.species.find(s => s.id === id);
    if (!sp) return;

    const ok = confirm(`¿Deseas editar "${sp.name}"?`);
    if (!ok) return;

    this.selectedSpecies = { ...sp };
  }


  onSaved(): void {
    this.selectedSpecies = null;
    this.loadSpecies();
  }

  onCancelEdit(): void {
    this.selectedSpecies = null;
  }

  // Cards inferiores (estadísticas rápidas)
  getTotalPopulation(): number {
    return this.species.reduce((acc, s) => acc + (s.population ?? 0), 0);
  }

  getCriticalCount(): number {
    return this.species.filter(s => s.conservationStatus === 'Crítico').length;
  }
}
