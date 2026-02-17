# Simulador de Ecosistema Virtual

Aplicación desarrollada en **Angular (Standalone Components)** que permite gestionar especies dentro de un ecosistema virtual, aplicando filtros dinámicos, estadísticas en tiempo real y operaciones CRUD completas.

##  Descripción del Proyecto
El **Simulador de Ecosistema Virtual** permite:

- Crear nuevas especies
- Editar especies existentes
- Eliminar especies con confirmación
- Reproducir especies (incremento automático según tasa de reproducción)
- Filtrar por tipo y estado de conservación
- Buscar especies por nombre
- Visualizar estadísticas dinámicas del ecosistema

El sistema está diseñado siguiendo buenas prácticas de separación de responsabilidades mediante:

- Componentes independientes
- Servicios
- Pipes personalizados
- Formularios reactivos
- Validaciones
- Confirmaciones de seguridad

- ##  Funcionalidades Implementadas

### Gestión de Especies (CRUD)
- Crear especie
- Editar especie
- Eliminar con confirmación
- Reproducir automáticamente según tasa %

### Filtros Dinámicos
- Filtro por tipo (Herbívoro, Carnívoro, Planta)
- Filtro por estado (Saludable, Media, Crítico)
- Buscador en tiempo real por nombre


### Estadísticas en Tiempo Real
- Total de especies
- Población total acumulada
- Número de especies en estado crítico

### Validaciones
- Campos obligatorios
- Población ≥ 0
- Reproducción entre 0% y 100%
- Confirmación antes de eliminar
- Confirmación antes de editar

---

## Arquitectura del Proyecto


src/
├── app/
│ ├── components/
│ │ ├── filter/
│ │ ├── species-form/
│ │ ├── species-list/
│ │ └── statistics/
│ ├── models/
│ ├── pipes/
│ ├── services/
│ ├── app.ts
│ ├── app.html
│ └── app.css
├── assets/
└── main.ts


## Tecnologías Utilizadas

- Angular (Standalone Components)
- TypeScript
- Reactive Forms
- Bootstrap
- RxJS
- Pipes personalizados
- CSS personalizado
- Git & GitHub



## Instalación y Ejecución

Clonar el repositorio:

```bash
git clone https://github.com/luisandresmartinezb/Simulator-Ecosystem-Virtual.git

En el fichero tsconfog.json añadir estas 3 lineas
- "target": "ES2022",
- "module": "esnext",
- "moduleResolution": "node"






