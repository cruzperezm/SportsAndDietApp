import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dashboard.service';

@Component({
  selector: 'app-diet-dashboard',
  templateUrl: './Dashboard-Dieta.html',
  styleUrls: ['./Dashboard-Dieta.css']
})
export class DietDashboardComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(res => {
      this.data = res;
    });
  }
}
