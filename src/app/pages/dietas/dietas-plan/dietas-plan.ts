import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DietaService } from '../../../services/dietas';

@Component({
  selector: 'app-dietas-plan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dietas-plan.html',
  styleUrl: './dietas-plan.css'
})
export class DietasPlanComponent implements OnInit {
  // Variables de estado
  dieta: any = null;
  idDieta: string | null = null;
  filtrosActivos: string[] = [];
  indices: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private dietaService: DietaService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Escuchamos cambios en la URL (importante para recargas con F5)
    this.route.paramMap.subscribe(params => {
      this.idDieta = params.get('id');
      if (this.idDieta) {
        this.cargarDatos(this.idDieta);
      }
    });
  }

  cargarDatos(id: string) {
    this.dietaService.obtenerPlanPorId(id).subscribe({
      next: (data: any) => {
        this.dieta = data;
        if (this.dieta && this.dieta.plan) {
          this.indices = {};
          this.dieta.plan.forEach((fase: any) => {
            this.indices[fase.momento] = 0;
          });
          // Forzamos a Angular a pintar los datos recién llegados
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error("Error al cargar datos:", err)
    });
  }

  // --- LAS FUNCIONES QUE FALTABAN SEGÚN TUS ERRORES ---

  volver() {
    this.location.back();
  }

  toggleFiltro(tipo: string) {
    if (tipo === 'todos') {
      this.filtrosActivos = [];
    } else {
      if (this.filtrosActivos.includes(tipo)) {
        this.filtrosActivos = this.filtrosActivos.filter(f => f !== tipo);
      } else {
        this.filtrosActivos.push(tipo);
      }
    }
    // Al filtrar, reseteamos carruseles a la posición inicial
    Object.keys(this.indices).forEach(k => this.indices[k] = 0);
    this.cdr.detectChanges();
  }

  getComidasFiltradas(fase: any): any[] {
    if (!fase || !fase.comidas) return [];
    if (this.filtrosActivos.length === 0) return fase.comidas;

    return fase.comidas.filter((c: any) => {
      const alergenosPlato = c.alergenos || [];
      return !this.filtrosActivos.some(f => alergenosPlato.includes(f));
    });
  }

  getComidasVisibles(fase: any): any[] {
    const filtradas = this.getComidasFiltradas(fase);
    const total = filtradas.length;

    if (total === 0) return [];
    if (total <= 3) return filtradas;

    const i = this.indices[fase.momento] || 0;
    return [
      filtradas[i % total],
      filtradas[(i + 1) % total],
      filtradas[(i + 2) % total]
    ];
  }

  mover(paso: number, momento: string) {
    const fase = this.dieta.plan.find((f: any) => f.momento === momento);
    const filtradas = this.getComidasFiltradas(fase);
    const total = filtradas.length;

    if (total <= 3) return;

    //lógica circular para el carrusel
    this.indices[momento] = (this.indices[momento] + paso + total) % total;
    this.cdr.detectChanges();
  }
}
