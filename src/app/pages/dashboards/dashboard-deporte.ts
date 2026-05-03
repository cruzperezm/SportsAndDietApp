import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/dashboard.service';

@Component({
  selector: 'app-sport-dashboard',
  standalone: true, //esto
  imports: [CommonModule, RouterModule], //esto
  templateUrl: './Dashboard-Deporte.html',
  styleUrls: ['./Dashboard-Deporte.css'],
})
export class SportDashboardComponent implements OnInit {
  public data: any;
  public ejercicios: any[] = [];
  public semana: any[] = [];
  public resumen: any = {};

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('1. Intentando conectar con el servicio...');

    this.dataService.getData().subscribe(
      (res: any) => {
        console.log('2. Respuesta recibida de Firebase:', res); // <--- ESTO ES CLAVE

        if (res) {
          this.data = res;
          if (res.deporte) {
            this.resumen = res.deporte.resumen || {};
            this.semana = res.deporte.semana || [];
            this.ejercicios = res.deporte.ejercicios || [];
          }
          this.cdr.detectChanges();
          console.log('3. Datos asignados y detector de cambios activado');
        } else {
          console.warn('Firebase devolvió un objeto vacío o nulo');
        }
      },
      (error) => {
        console.error('ERROR REAL DE FIREBASE:', error);
      },
    );
  }

  getBarHeight(valor: number): string {
    return `${valor * 0.12}rem`;
  }

  getLabelPosition(index: number): string {
    const positions = [7, 21, 35, 50, 64, 78, 92];
    return `${positions[index]}%`;
  }
}
