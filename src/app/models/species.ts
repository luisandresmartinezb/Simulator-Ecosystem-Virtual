export interface Species {
  id: number;
  name: string;
  type: 'Herbívoro' | 'Carnívoro' | 'Planta';
  population: number;
  reproductionRate: number;
  conservationStatus?: 'Saludable' | 'Media' | 'Crítico';
}
