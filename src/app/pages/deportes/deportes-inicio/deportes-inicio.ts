import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeporteService } from '../../../services/deportes';

export class DeportesInicioComponent implements OnInit {
  modoBusqueda: boolean = false;
  resultados: any[] = [];
  textoBusqueda: string = '';

  // 1. La lista ahora empieza vacía
  planesDeportivos: any[] = [];

  constructor(
    private router: Router,
    private deporteService: DeporteService,
  ) {}

  ngOnInit() {
    this.deporteService.getDeportes().subscribe((datos) => {
      this.planesDeportivos = datos;
    });
  }

  irAlPlan(id: number) {
    this.router.navigate(['/deportes/plan', id]);
  }


  onBuscar(event: any) {
    this.textoBusqueda = event.target.value;

    if (this.textoBusqueda.length > 2) {
      this.modoBusqueda = true;
      this.deporteService.buscarEjercicios(this.textoBusqueda).subscribe((datos: any[]) => {
        this.resultados = datos;
      });
    } else {
      this.modoBusqueda = false;
      this.resultados = [];
    }
  }

  limpiarBusqueda() {
    this.textoBusqueda = '';
    this.modoBusqueda = false;
    this.resultados = [];
  }

  irAEjercicio(id: string) {
    this.router.navigate(['/deportes/ejercicio', id]);
  }
}
