import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { EcosystemService } from '../../services/ecosystem';
import { Species } from '../../models/species';

type SpeciesType = 'Herbívoro' | 'Carnívoro' | 'Planta';
type StatusType = 'Saludable' | 'Media' | 'Crítico';

@Component({
  selector: 'app-species-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './species-form.html',
  styleUrl: './species-form.css'
})
export class SpeciesFormComponent implements OnChanges {

  @Input() selected: Species | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  editingId: number | null = null;

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)
      ]
    }),

    type: new FormControl<SpeciesType>('Herbívoro', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    population: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)]
    }),

    reproductionRate: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(100)]
    }),

    conservationStatus: new FormControl<StatusType>('Media', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(private ecosystemService: EcosystemService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selected']) return;

    const sp = this.selected;

    if (sp) {
      this.editingId = sp.id;
      this.form.setValue({
        name: sp.name,
        type: sp.type as SpeciesType,
        population: sp.population,
        reproductionRate: sp.reproductionRate,
        conservationStatus: (sp.conservationStatus ?? 'Media') as StatusType
      });
    } else {
      this.resetForm();
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();

    const payload: Species = {
      id: this.editingId ?? 0,
      name: v.name.trim(),
      type: v.type,
      population: v.population,
      reproductionRate: v.reproductionRate,
      conservationStatus: v.conservationStatus
    };

    const req$ = this.editingId
      ? this.ecosystemService.updateSpecies(payload)
      : this.ecosystemService.addSpecie(payload);

    req$.subscribe(() => {
      this.resetForm();
      this.saved.emit();
    });
  }

  cancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm(): void {
    this.editingId = null;
    this.form.reset({
      name: '',
      type: 'Herbívoro',
      population: 0,
      reproductionRate: 0,
      conservationStatus: 'Media'
    });
  }
}
