import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeporteService {
  private jsonUrl = 'assets/data/deportes.json';

  constructor(private http: HttpClient) {}

  obtenerPlanPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const idBuscado = String(id).trim();
        return data.deportes.find((d: any) => String(d.id) === idBuscado);
      })
    );
  }

  obtenerEjercicioPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        let ejercicioEncontrado = null;
        data.deportes.forEach((dep: any) => {
          dep.plan.forEach((fase: any) => {
            const ej = fase.ejercicios.find((e: any) => String(e.id) === String(id));
            if (ej) ejercicioEncontrado = ej;
          });
        });
        return ejercicioEncontrado;
      })
    );
  }

  buscarEjercicios(termino: string): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const resultados: any[] = [];
        const busqueda = termino.toLowerCase();
        data.deportes.forEach((dep: any) => {
          dep.plan.forEach((fase: any) => {
            fase.ejercicios.forEach((e: any) => {
              if (e.nombre.toLowerCase().includes(busqueda)) {
                resultados.push(e);
              }
            });
          });
        });
        return resultados;
      })
    );
  }
}
