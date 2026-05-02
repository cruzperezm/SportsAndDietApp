import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dashboard.service';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './Dashboard-Dieta.html',
  styleUrls: ['./Dashboard-Dieta.css']
})
export class DietDashboardComponent implements OnInit {
  public data: any; // Mantenemos la propiedad de datos[cite: 7]

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Llamada al servicio que ahora conecta con Firestore[cite: 7]
    this.dataService.getData().subscribe(res => {
      if (res) {
        this.data = res;
      }
    });
  }
}
