import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DeporteService } from '../../../services/deportes';

@Component({
  selector: 'app-deportes-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deportes-inicio.html',
  styleUrl: './deportes-inicio.css',
})
export class DeportesInicioComponent implements OnInit {
  //variables del Buscador
  modoBusqueda: boolean = false;
  resultados: any[] = [];
  textoBusqueda: string = '';

  //lista original de planes
  planesDeportivos = [
    {
      id: 1,
      titulo: 'HIIT',
      imagen: '/assets/img/deporte/portadas/portada-1.jpg',
    },
    {
      id: 2,
      titulo: 'Aumento de Masa Muscular',
      imagen: '/assets/img/deporte/portadas/portada-2.jpg',
    },
    { id: 3, titulo: 'Flexibilidad', imagen: '/assets/img/deporte/portadas/portada-3.jpg' },
    { id: 4, titulo: 'Potencia', imagen: '/assets/img/deporte/portadas/portada-4.jpg' },
    { id: 5, titulo: 'Resistencia', imagen: '/assets/img/deporte/portadas/portada-5.jpg' },
    {
      id: 6,
      titulo: 'Entrenamiento en Casa',
      imagen: '/assets/img/deporte/portadas/portada-6.jpg',
    },
  ];

  constructor(
    private router: Router,
    private deporteService: DeporteService,
  ) {}

  ngOnInit() {}

  irAlPlan(id: number) {
    this.router.navigate(['/deportes/plan', id]);
  }

  //metodos del buscador
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
