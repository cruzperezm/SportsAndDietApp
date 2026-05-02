import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DietaService {
  private jsonUrl = '/assets/data/dieta.json';

  constructor(private http: HttpClient) {}

  // Función auxiliar inteligente para detectar la lista de dietas
  private obtenerLista(data: any): any[] | null {
    if (!data) return null;
    // Busca si se llama "dietas", si se llama "dieta", o si el archivo entero ya es la lista
    return data.dietas || data.dieta || (Array.isArray(data) ? data : null);
  }

  // 1. Para la página de PLAN
  obtenerPlanPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const lista = this.obtenerLista(data);
        if (!lista) return null;

        const idLimpio = String(id).trim();
        const encontrado = lista.find((d: any) => String(d.id).trim() === idLimpio);

        if (!encontrado) {
          console.error(`Error: Dieta con ID '${idLimpio}' no encontrada en el JSON.`);
          return null;
        }

        return encontrado;
      })
    );
  }

  // 2. Para la página de DETALLE
  obtenerRecetaPorId(id: string | null): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const lista = this.obtenerLista(data);
        if (!lista) return null;

        let encontrada = null;
        for (const dieta of lista) {
          for (const fase of dieta.plan) {
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

  // 3. Para el BUSCADOR de la página de inicio
  buscarRecetas(termino: string): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => {
        const lista = this.obtenerLista(data);
        if (!lista) return [];

        const resultados: any[] = [];
        const busqueda = termino.toLowerCase();

        lista.forEach((dieta: any) => {
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
