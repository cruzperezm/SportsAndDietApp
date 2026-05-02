import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dashboard.service'; // Ajusta la ruta

@Component({
  selector: 'app-sport-dashboard',
  templateUrl: './Dashboard-Deporte.html',
  styleUrls: ['./Dashboard-Deporte.css'],
})
export class SportDashboardComponent implements OnInit {
  public data: any;
  public ejercicios: any[] = [];
  public semana: any[] = [];
  public resumen: any = {};

  // Inyectamos el servicio de datos en lugar de HttpClient[cite: 1, 4]
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable que viene de Firebase[cite: 4]
    this.dataService.getData().subscribe((res: any) => {
      if (res) {
        this.data = res;
        this.resumen = res.deporte.resumen;
        this.semana = res.deporte.semana;
        this.ejercicios = res.deporte.ejercicios;
      }
    });
  }

  getBarHeight(valor: number): string {
    return `${valor * 0.12}rem`;
  }

  getLabelPosition(index: number): string {
    const positions = [7, 21, 35, 50, 64, 78, 92];
    return `${positions[index]}%`;
  }
}
