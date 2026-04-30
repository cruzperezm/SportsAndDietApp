import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeporteService } from '../../../services/deportes';

@Component({
  selector: 'app-deportes-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deportes-detalle.html',
  styleUrl: './deportes-detalle.css',
})
export class DeportesDetalleComponent implements OnInit {
  itemId: string | null = null;
  detalleData: any = null;
  tipoVista: 'plan' | 'ejercicio' | null = null; // <- Añadimos esta variable

  constructor(
    private route: ActivatedRoute,
    private deporteService: DeporteService,
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.cargarDatos(this.itemId);
      }
    });
  }

  cargarDatos(id: string) {
    this.deporteService.obtenerEjercicioPorId(id).subscribe({
      next: (data: any) => {
        this.detalleData = data;

        // Detectamos qué nos ha devuelto el JSON
        if (this.detalleData && this.detalleData.plan) {
          this.tipoVista = 'plan'; // Es el HIIT entero
        } else if (this.detalleData && this.detalleData.estadisticas) {
          this.tipoVista = 'ejercicio'; // Es un ejercicio suelto
        }

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar:', err),
    });
  }

  volver() {
    this.location.back();
  }
}
