import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DietaService {
  private jsonUrl = 'assets/data/dietas.json';

  constructor(private http: HttpClient) {}

  // 1. Para la página de PLAN
  // 1. Para la página de PLAN
  obtenerPlanPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        if (!data || !data.dietas) return null;

        const idLimpio = String(id).trim();
        const encontrado = data.dietas.find((d: any) => String(d.id).trim() === idLimpio);

        if (!encontrado) {
          console.error(`Error: Dieta con ID '${idLimpio}' no encontrada en el JSON.`);
          return null;
        }

        return encontrado;
      })
    );
  }

  // 2. Para la página de DETALLE (Corrige el error TS2339)
  obtenerRecetaPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        let encontrada = null;
        if (!data || !data.dietas) return null;

        // Buscamos en todas las dietas
        for (const dieta of data.dietas) {
          // En cada fase (Desayuno, Almuerzo...)
          for (const fase of dieta.plan) {
            // Buscamos la comida por ID
            const receta = fase.comidas.find((c: any) => String(c.id) === String(id));
            if (receta) {
              encontrada = receta;
              break;
            }
          }
          if (encontrada) break;
        }
        return encontrada;
      })
    );
  }

  // 3. Para el BUSCADOR de la página de inicio (Corrige el error TS2339)
  buscarRecetas(termino: string): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const resultados: any[] = [];
        const busqueda = termino.toLowerCase();
        data.dietas.forEach((dieta: any) => {
          dieta.plan.forEach((fase: any) => {
            fase.comidas.forEach((c: any) => {
              if (c.nombre.toLowerCase().includes(busqueda)) {
                resultados.push(c);
              }
            });
          });
        });
        return resultados;
      })
    );
  }
}
