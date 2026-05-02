import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DeporteService {
  constructor(private firestore: Firestore) {}

  getDeportes(): Observable<any[]> {
    const deportesRef = collection(this.firestore, 'deportes');
    const q = query(deportesRef);

    // Convertimos la promesa de Firebase en un Observable de RxJS manualmente
    return from(getDocs(q)).pipe(
      map((snapshot) => {
        const datos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('--- Datos recuperados de Firestore ---', datos);
        return datos;
      }),
    );
  }

  obtenerPlanPorId(id: string): Observable<any> {
    const deporteDocRef = doc(this.firestore, `deportes/${id}`);
    return from(getDoc(deporteDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          console.error('¡El documento no existe en Firebase!');
          return null;
        }
      }),
    );
  }

  obtenerEjercicioPorId(id: string): Observable<any> {
    return this.getDeportes().pipe(
      map(deportes => {
        let ejercicioEncontrado = null;
        deportes.forEach(deporte => {
          if (deporte.plan) {
            deporte.plan.forEach((p: any) => {
              const ej = p.ejercicios.find((e: any) => e.id == id);
              if (ej) ejercicioEncontrado = ej;
            });
          }
        });
        return ejercicioEncontrado;
      })
    );
  }

  async migrarDatosMasivos(datosJson: any[]) {
    try {
      const deportesRef = collection(this.firestore, 'deportes');
      for (const deporte of datosJson) {
        const docRef = doc(deportesRef, deporte.id.toString());
        await setDoc(docRef, deporte);
        console.log(`✅ Migrado: ${deporte.titulo}`);
      }
      alert('¡Migración masiva completada con éxito!');
    } catch (error) {
      console.error('Error en la migración:', error);
    }
  }

  buscarEjercicios(termino: string): Observable<any[]> {
    return this.getDeportes().pipe(
      map((deportes) =>
        deportes.filter((d) => d.titulo.toLowerCase().includes(termino.toLowerCase())),
      ),
    );
  }
}
