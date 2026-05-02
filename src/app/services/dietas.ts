import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietaService {
  constructor(private firestore: Firestore) {}

  getDietas(): Observable<any[]> {
    const dietasRef = collection(this.firestore, 'dietas');
    const q = query(dietasRef);

    return from(getDocs(q)).pipe(
      map((snapshot) => {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
    );
  }

  obtenerPlanPorId(id: string): Observable<any> {
    const dietaDocRef = doc(this.firestore, `dietas/${id}`);
    return from(getDoc(dietaDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      })
    );
  }

  obtenerRecetaPorId(id: string): Observable<any> {
    return this.getDietas().pipe(
      map(dietas => {
        let recetaEncontrada = null;
        dietas.forEach(dieta => {
          if (dieta.plan) {
            dieta.plan.forEach((fase: any) => {
              const receta = fase.comidas.find((c: any) => c.id == id);
              if (receta) recetaEncontrada = receta;
            });
          }
        });
        return recetaEncontrada;
      })
    );
  }

  buscarRecetas(termino: string): Observable<any[]> {
    return this.getDietas().pipe(
      map(dietas => {
        const resultados: any[] = [];
        const busqueda = termino.toLowerCase();

        dietas.forEach(dieta => {
          if (dieta.plan) {
            dieta.plan.forEach((fase: any) => {
              fase.comidas.forEach((c: any) => {
                if (c.nombre.toLowerCase().includes(busqueda)) {
                  resultados.push({ ...c, nombreDieta: dieta.titulo });
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
