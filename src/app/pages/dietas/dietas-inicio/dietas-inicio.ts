import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DietaService } from '../../../services/dietas';

@Component({
  selector: 'app-dietas-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dietas-inicio.html',
  styleUrl: './dietas-inicio.css',
})
export class DietasInicioComponent implements OnInit {
  modoBusqueda: boolean = false;
  resultados: any[] = [];
  textoBusqueda: string = '';
  dietas: any[] = [];

  constructor(
    private router: Router,
    private dietaService: DietaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.dietaService.getDietas().subscribe((datos) => {
      this.dietas = datos.map((dieta) => ({
        id: dieta.id,
        nombre: dieta.titulo,
        imagen: dieta.imagen,
      }));
      this.cdr.detectChanges();
    });
  }

  irAlPlan(id: string) {
    this.router.navigate(['/dietas/plan', id]);
  }

  onBuscar(event: any) {
    this.textoBusqueda = event.target.value;

    if (this.textoBusqueda.length > 2) {
      this.modoBusqueda = true;
      this.dietaService.buscarRecetas(this.textoBusqueda).subscribe((datos: any[]) => {
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

  irAReceta(id: string) {
    this.router.navigate(['/dietas/receta', id]);
  }
}
