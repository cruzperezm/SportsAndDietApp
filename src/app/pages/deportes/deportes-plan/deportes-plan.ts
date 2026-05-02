import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeporteService } from '../../../services/deportes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deportes-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deportes-plan.html',
  styleUrls: ['./deportes-plan.css']
})
export class DeportesPlanComponent implements OnInit {
  deporte: any;
  filtrosActivos: string[] = [];
  gruposDisponibles: string[] = [];
  indicesCarrusel: { [key: string]: number } = {};

  mapaGrupos: { [key: string]: string } = {
    'Bíceps': 'Brazos',
    'Tríceps': 'Brazos',
    'Antebrazos': 'Brazos',
    'Brazos': 'Brazos',
    'Cuádriceps': 'Piernas',
    'Isquiotibiales': 'Piernas',
    'Gemelos': 'Piernas',
    'Glúteos': 'Piernas',
    'Piernas': 'Piernas',
    'Espalda': 'Espalda',
    'Espalda alta': 'Espalda',
    'Lumbar': 'Espalda',
    'Dorsales': 'Espalda',
    'Trapecios': 'Espalda',
    'Pecho': 'Pecho',
    'Pectorales': 'Pecho',
    'Hombros': 'Hombros',
    'Deltoides': 'Hombros',
    'Core': 'Core',
    'Abdominales': 'Core',
    'Cardio': 'Cardio',
    'Estiramientos': 'Movilidad',
    'Columna': 'Movilidad',
    'Cuello': 'Movilidad',
  };

  constructor(
    private route: ActivatedRoute,
    private deporteService: DeporteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deporteService.obtenerPlanPorId(id).subscribe({
        next: (data) => {
          this.deporte = data;

          if (this.deporte) {
            this.extraerGrupos();

            // Inicializar el índice del carrusel para cada fase en 0
            this.deporte.plan?.forEach((fase: any) => {
              const nombreFase = fase.nivel || fase.nombre;
              this.indicesCarrusel[nombreFase] = 0;
            });

            this.cdr.detectChanges(); // Forzamos el pintado
          }
        },
        error: (err) => console.error('Error cargando el plan:', err)
      });
    }
  }

  // EXTRACCIÓN DE GRUPOS (Normalizando texto)
  extraerGrupos() {
    const gruposSet = new Set<string>();

    const mapaNormalizado: { [key: string]: string } = {};
    for (const [musculo, grupo] of Object.entries(this.mapaGrupos)) {
      mapaNormalizado[musculo.toLowerCase().trim()] = grupo;
    }

    this.deporte.plan?.forEach((fase: any) => {
      fase.ejercicios?.forEach((ej: any) => {
        ej.musculos?.forEach((m: string) => {
          const mNormalizado = m.toLowerCase().trim();
          const grupoEncontrado = mapaNormalizado[mNormalizado];
          if (grupoEncontrado) {
            gruposSet.add(grupoEncontrado);
          }
        });
      });
    });

    this.gruposDisponibles = Array.from(gruposSet).sort();
  }

  // LÓGICA DE FILTROS
  toggleFiltro(grupo: string) {
    if (grupo === 'todos') {
      this.filtrosActivos = [];
    } else {
      const index = this.filtrosActivos.indexOf(grupo);
      if (index > -1) {
        this.filtrosActivos.splice(index, 1);
      } else {
        this.filtrosActivos.push(grupo);
      }
    }

    // Reiniciamos los carruseles al cambiar un filtro
    Object.keys(this.indicesCarrusel).forEach(key => this.indicesCarrusel[key] = 0);
  }

  getEjerciciosFiltrados(fase: any) {
    if (this.filtrosActivos.length === 0) return fase.ejercicios || [];

    const mapaNormalizado: { [key: string]: string } = {};
    for (const [musculo, grupo] of Object.entries(this.mapaGrupos)) {
      mapaNormalizado[musculo.toLowerCase().trim()] = grupo;
    }

    return fase.ejercicios.filter((ej: any) => {
      return ej.musculos?.some((m: string) => {
        const mNormalizado = m.toLowerCase().trim();
        const grupoDelMusculo = mapaNormalizado[mNormalizado];
        return grupoDelMusculo && this.filtrosActivos.includes(grupoDelMusculo);
      });
    });
  }

  // LÓGICA DEL CARRUSEL CIRCULAR
  getEjerciciosVisibles(fase: any) {
    const filtrados = this.getEjerciciosFiltrados(fase);
    const total = filtrados.length;

    if (total === 0) return [];
    if (total <= 3) return filtrados;

    const nombreFase = fase.nivel || fase.nombre;
    const inicio = this.indicesCarrusel[nombreFase] || 0;
    const visibles = [];

    for (let i = 0; i < 3; i++) {
      visibles.push(filtrados[(inicio + i) % total]);
    }

    return visibles;
  }

  mover(direccion: number, nivel: string) {
    const faseEncontrada = this.deporte.plan.find((f:any) => (f.nivel || f.nombre) === nivel);
    if (!faseEncontrada) return;

    const filtrados = this.getEjerciciosFiltrados(faseEncontrada);
    const total = filtrados.length;

    if (total <= 3) return;

    let actual = this.indicesCarrusel[nivel] || 0;
    let nuevoIndice = (actual + direccion) % total;

    if (nuevoIndice < 0) {
      nuevoIndice = total - 1;
    }

    this.indicesCarrusel[nivel] = nuevoIndice;
  }

  volver() {
    this.router.navigate(['/deportes']);
  }
}
