import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = "../pages/dashboards/data.json"; // Asegúrate de colocar data.json en assets

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
