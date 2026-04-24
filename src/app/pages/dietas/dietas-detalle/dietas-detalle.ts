import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DietaService } from '../../../services/dietas';

@Component({
  selector: 'app-dieta-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dietas-detalle.html',
  styleUrl: './dietas-detalle.css'
})
export class DietasDetalleComponent implements OnInit {
  recetaId: string | null = null;
  receta: any = null;

  constructor(
    private route: ActivatedRoute,
    private dietasService: DietaService,
    private location: Location,
    private cdr: ChangeDetectorRef // Importante para refrescar la vista
  ) {}

  ngOnInit() {
    // Usamos paramMap para que funcione siempre, incluso al recargar
    this.route.paramMap.subscribe(params => {
      this.recetaId = params.get('id');
      if (this.recetaId) {
        this.cargarReceta(this.recetaId);
      }
    });
  }

  cargarReceta(id: string) {
    this.dietasService.obtenerRecetaPorId(id).subscribe({
      next: (data) => {
        console.log('Receta encontrada:', data);
        this.receta = data;
        // Forzamos a Angular a pintar los datos
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar detalle:', err)
    });
  }

  volverAtras(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
