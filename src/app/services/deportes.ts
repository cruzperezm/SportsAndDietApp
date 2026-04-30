import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeporteService {
  private jsonUrl = 'assets/data/deportes.json';

  constructor(private http: HttpClient) {}

  getDeportes(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(map((response) => response.deportes));
  }

  obtenerPlanPorId(id: string | number): Observable<any> {
    const idNumerico = Number(id);
    return this.getDeportes().pipe(map((deportes) => deportes.find((d) => d.id === idNumerico)));
  }

  obtenerEjercicioPorId(id: string): Observable<any> {
    return this.getDeportes().pipe(
      map((deportes) => {
        for (const deporte of deportes) {
          for (const fase of deporte.plan) {
            const ejercicio = fase.ejercicios.find((ej: any) => ej.id === id);
            if (ejercicio) return ejercicio;
          }
        }
        return null;
      }),
    );
  }

  /**
   * Buscador global para el componente de Inicio
   */
  buscarEjercicios(termino: string): Observable<any[]> {
    const term = termino.toLowerCase();
    return this.getDeportes().pipe(
      map((deportes) => {
        let encontrados: any[] = [];
        deportes.forEach((deporte) => {
          deporte.plan.forEach((fase: any) => {
            const matches = fase.ejercicios.filter(
              (ej: any) =>
                ej.nombre.toLowerCase().includes(term) ||
                ej.musculos.some((m: string) => m.toLowerCase().includes(term)),
            );
            encontrados = [...encontrados, ...matches];
          });
        });
        return encontrados;
      }),
    );
  }
}
