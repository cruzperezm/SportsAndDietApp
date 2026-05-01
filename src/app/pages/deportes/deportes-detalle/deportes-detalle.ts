import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeporteService } from '../../../services/deportes';

@Component({
  selector: 'app-deportes-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deportes-detalle.html',
  styleUrls: ['./deportes-detalle.css'], // Cambiado styleUrl por styleUrls (es lo estándar en Angular)
})
export class DeportesDetalleComponent implements OnInit {
  itemId: string | null = null;
  detalleData: any = null;
  cargando: boolean = true;

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
    this.cargando = true;
    this.deporteService.obtenerEjercicioPorId(id).subscribe({
      next: (data: any) => {
        this.detalleData = data;
        this.cargando = false;
        this.cdr.detectChanges(); // Forzamos a Angular a pintar el diseño
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.cargando = false;
      },
    });
  }

  volver() {
    this.location.back(); // Esto te devuelve al carrusel exacto donde estabas
  }
}
