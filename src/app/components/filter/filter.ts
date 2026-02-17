import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class FilterComponent {
  type: '' | 'Herbívoro' | 'Carnívoro' | 'Planta' = '';
  status: '' | 'Saludable' | 'Media' | 'Crítico' = '';

  @Output() filtersChange = new EventEmitter<{ type: string; status: string }>();

  emitFilters() {
    this.filtersChange.emit({ type: this.type, status: this.status });
  }

  clear() {
    this.type = '';
    this.status = '';
    this.emitFilters();
  }
}
