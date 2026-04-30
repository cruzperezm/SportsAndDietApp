import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeporteService } from '../../../services/deportes';

@Component({
  selector: 'app-deportes-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deportes-plan.html',
  styleUrl: './deportes-plan.css',
})
export class DeportesPlanComponent implements OnInit {
  deporte: any = null;
  filtrosActivos: string[] = [];
  indices: { [key: string]: number } = {};

  musculosDisponibles: string[] = [];

  mapaGrupos: { [key: string]: string } = {
    Bíceps: 'Brazos',
    Tríceps: 'Brazos',
    Antebrazos: 'Brazos',
    Brazos: 'Brazos',
    Cuádriceps: 'Piernas',
    Isquiotibiales: 'Piernas',
    Gemelos: 'Piernas',
    Glúteos: 'Piernas',
    Piernas: 'Piernas',
    Espalda: 'Espalda',
    'Espalda alta': 'Espalda',
    Lumbar: 'Espalda',
    Dorsales: 'Espalda',
    Trapecios: 'Espalda',
    Pecho: 'Pecho',
    Pectorales: 'Pecho',
    Hombros: 'Hombros',
    Deltoides: 'Hombros',
    Core: 'Core',
    Abdominales: 'Core',
    Cardio: 'Cardio',
    Estiramientos: 'Movilidad',
    Columna: 'Movilidad',
    Cuello: 'Movilidad',
  };

  constructor(
    private route: ActivatedRoute,
    private deporteService: DeporteService,
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.deporteService.obtenerPlanPorId(id).subscribe({
          next: (data: any) => {
            this.deporte = data;
            if (this.deporte && this.deporte.plan) {
              this.indices = {};

              const gruposSet = new Set<string>();

              this.deporte.plan.forEach((fase: any) => {
                this.indices[fase.nivel] = 0;

                fase.ejercicios?.forEach((ej: any) => {
                  ej.gruposMusculares = [];

                  ej.musculos?.forEach((m: string) => {
                    const grupo = this.mapaGrupos[m] || 'Otros';

                    if (!ej.gruposMusculares.includes(grupo)) {
                      ej.gruposMusculares.push(grupo);
                    }

                    gruposSet.add(grupo);
                  });
                });
              });

              // Evitamos mostrar un botón que diga "Otros" si no es estrictamente necesario
              const gruposArray = Array.from(gruposSet).filter((g) => g !== 'Otros');
              this.musculosDisponibles = gruposArray.sort();

              this.cdr.detectChanges();
            }
          },
        });
      }
    });
  }

  volver() {
    this.location.back();
  }

  toggleFiltro(tipo: string) {
    if (tipo === 'todos') this.filtrosActivos = [];
    else {
      this.filtrosActivos.includes(tipo)
        ? (this.filtrosActivos = this.filtrosActivos.filter((f) => f !== tipo))
        : this.filtrosActivos.push(tipo);
    }
    Object.keys(this.indices).forEach((k) => (this.indices[k] = 0));
    this.cdr.detectChanges();
  }

  getEjerciciosFiltrados(fase: any): any[] {
    if (!fase?.ejercicios) return [];

    if (this.filtrosActivos.length === 0) return fase.ejercicios;

    return fase.ejercicios.filter((e: any) =>
      this.filtrosActivos.some((f) => e.gruposMusculares && e.gruposMusculares.includes(f)),
    );
  }

  getEjerciciosVisibles(fase: any): any[] {
    const filtrados = this.getEjerciciosFiltrados(fase);
    const total = filtrados.length;
    if (total === 0) return [];
    if (total <= 3) return filtrados;

    const i = this.indices[fase.nivel] || 0;

    return [filtrados[i % total], filtrados[(i + 1) % total], filtrados[(i + 2) % total]];
  }

  mover(paso: number, nivel: string) {
    const fase = this.deporte.plan.find((f: any) => f.nivel === nivel);
    const total = this.getEjerciciosFiltrados(fase).length;
    if (total <= 3) return;
    this.indices[nivel] = (this.indices[nivel] + paso + total) % total;
    this.cdr.detectChanges();
  }
}
