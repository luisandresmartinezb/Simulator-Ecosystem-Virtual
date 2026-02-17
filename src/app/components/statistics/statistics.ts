import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcosystemService } from '../../services/ecosystem';
import { Species } from '../../models/species';

import { PopulationFormatPipe } from '../../pipes/population-format-pipe';
import { ConservationStatusPipe } from '../../pipes/conservation-status-pipe';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, PopulationFormatPipe, ConservationStatusPipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class StatisticsComponent implements OnInit {

  species: Species[] = [];

  constructor(private ecosystemService: EcosystemService) { }

  ngOnInit(): void {
    this.ecosystemService.getSpecies().subscribe(data => {
      this.species = data ?? [];
    });
  }

  get totalSpecies(): number {
    return this.species.length;
  }

  get totalPopulation(): number {
    return this.species.reduce((acc, s) => acc + (s.population ?? 0), 0);
  }

  get criticalCount(): number {
    return this.species.filter(s => s.conservationStatus === 'Crítico').length;
  }

  get criticalPercent(): number {
    if (this.totalSpecies === 0) return 0;
    return Math.round((this.criticalCount / this.totalSpecies) * 100);
  }
}
