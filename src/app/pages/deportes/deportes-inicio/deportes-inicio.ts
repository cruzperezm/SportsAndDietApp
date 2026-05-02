import { Router } from '@angular/router';
import { DeporteService } from '../../../services/deportes';
import datosDeportes from '../../../../assets/data/deportes.json';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-deportes-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deportes-inicio.html',
  styleUrls: ['./deportes-inicio.css']
})

export class DeportesInicioComponent implements OnInit {
  modoBusqueda: boolean = false;
  resultados: any[] = [];
  textoBusqueda: string = '';

  planesDeportivos: any[] = [];

  constructor(
    private deporteService: DeporteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.deporteService.getDeportes().subscribe({
      next: (datos) => {
        console.log('DATOS LLEGANDO:', datos);
        this.planesDeportivos = datos;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('ERROR CRÍTICO:', err)
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
