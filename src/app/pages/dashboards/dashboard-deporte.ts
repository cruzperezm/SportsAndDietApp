import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sport-dashboard',
  templateUrl: './sport-dashboard.component.html',
  styleUrls: ['./sport-dashboard.component.css']
})
export class SportDashboardComponent implements OnInit {
  public data: any;
  public ejercicios: any[] = [];
  public semana: any[] = [];
  public resumen: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('data.json').subscribe((res: any) => {
      this.data = res;
      this.resumen = res.deporte.resumen;
      this.semana = res.deporte.semana;
      this.ejercicios = res.deporte.ejercicios;
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
