import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {

  constructor(private firestore: Firestore) {}

  getDeportes(): Observable<any[]> {
    const deportesRef = collection(this.firestore, 'deportes');
    const q = query(deportesRef);

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
    );
  }

  obtenerPlanPorId(id: string | null): Observable<any> {
    if (!id) return from([null]);
    const deporteDocRef = doc(this.firestore, `deportes/${id}`);

    return from(getDoc(deporteDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      })
    );
  }

  obtenerEjercicioPorId(id: string | null): Observable<any> {
    return this.getDeportes().pipe(
      map(deportes => {
        let ejercicioEncontrado = null;
        deportes.forEach(dep => {
          if (dep.plan) {
            dep.plan.forEach((fase: any) => {
              const ej = fase.ejercicios.find((e: any) => String(e.id) === String(id));
              if (ej) ejercicioEncontrado = ej;
            });
          }
        });
        return ejercicioEncontrado;
      })
    );
  }

  buscarEjercicios(termino: string): Observable<any[]> {
    return this.getDeportes().pipe(
      map(deportes => {
        const resultados: any[] = [];
        const busqueda = termino.toLowerCase();

        deportes.forEach(dep => {
          if (dep.plan) {
            dep.plan.forEach((fase: any) => {
              fase.ejercicios.forEach((e: any) => {
                if (e.nombre.toLowerCase().includes(busqueda)) {
                  resultados.push({ ...e, nombreDeporte: dep.nombre });
                }
              });
            });
          }
        });
        return resultados;
      })
    );
  }
}
